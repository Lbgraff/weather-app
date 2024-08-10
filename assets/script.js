const searchBtnEl = document.querySelector('.search-btn');

function getWeather(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=67a082e6237fd9e9c7689df68c6ad90f`;

    fetch(queryURL)
        .then(response => {
            return response.json()

        })

        .then(data => {

            console.log(data);
            document.querySelector(".display-weather").innerHTML = '';

            let nameEl = document.createElement("p");
            nameEl.textContent = data.name;
            document.querySelector(".display-weather").appendChild(nameEl);

            let iconEl = document.createElement('img');
            iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.querySelector('.display-weather').appendChild(iconEl);

            let dateEl = document.createElement("p");
            dateEl.textContent = new Date().toISOString().replace(/T.*/, '');
            document.querySelector(".display-weather").appendChild(dateEl);

            let tempEl = document.createElement("p");
            tempEl.textContent = "Temp: " + data.main.temp + "F";
            document.querySelector(".display-weather").appendChild(tempEl);

            let tempMinEl = document.createElement("p");
            tempMinEl.textContent = "Min temp: " + data.main.temp_min + "F";
            document.querySelector(".display-weather").appendChild(tempMinEl);

            let tempMaxEl = document.createElement("p");
            tempMaxEl.textContent = "Max temp: " + data.main.temp_max + "F";
            document.querySelector(".display-weather").appendChild(tempMaxEl);

            let windEl = document.createElement("p");
            windEl.textContent = "Wind speed: " + data.wind.speed + "mph";
            document.querySelector(".display-weather").appendChild(windEl);

            let humidityEl = document.createElement("p");
            humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
            document.querySelector(".display-weather").appendChild(humidityEl);

        })

}

// for (let i = 0; i < localStorage.length; i++) {

//     document.querySelector(".display-local-storage").append(localStorage.getItem(localStorage.key(i)));

//     localStorage.setItem("searchedCities", JSON.stringify(searchInputVal));

//     let searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
//     searchedCities.push(searchInputVal);


function getForecast(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=67a082e6237fd9e9c7689df68c6ad90f`;

    fetch(queryURL)
        .then(response => {
            return response.json()
        })

        .then(data => {
            console.log(data);
            document.querySelector('.display-forecast').innerHTML = '';

            for (let i = 0; i < data.list.length; i = i + 8) {
                let forecastDiv = document.createElement('div');

                let forecastDateEl = document.createElement("p");
                forecastDateEl.textContent = data.list[i].dt_txt.split(' ')[0];
                forecastDiv.appendChild(forecastDateEl);

                let iconEl = document.createElement('img');
                iconEl.src = `https://openweathermap.org/img/wn/${data.weather[i].icon}.png`;
                document.querySelector('.display-weather').appendChild(iconEl);

                let tempEl = document.createElement("p");
                tempEl.textContent = "Temp: " + data.list[i].main.temp + "F";
                forecastDiv.appendChild(tempEl);

                let windEl = document.createElement("p");
                windEl.textContent = "Wind speed: " + data.list[i].wind.speed + "mph";
                forecastDiv.appendChild(windEl);

                let humidityEl = document.createElement("p");
                humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                forecastDiv.appendChild(humidityEl);

                document.querySelector('.display-forecast').appendChild(forecastDiv);

            }
        }
        )
}

// Create a function to save searched cities into a localStorage key
function saveCity(cityName) {
    // Have a variable that is either the preexisting searched cities or an empty array
    var pastSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    // Add the searched city into our pastSearches array
    if (!pastSearches.includes(cityName)) {
        pastSearches.push(cityName);
        // Overwirite/update the 'pastSearches' key in lcoalStorage to contain the new searched city
        localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
    }
};

// Create a function to display the past searches as functional buttons
function displayPastSearches() {
    var pastSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    document.querySelector('#past-searches').innerHTML = '';
    // Create and append some buttons for our past searches
    for (let index = 0; index < pastSearches.length; index++) {
        const city = pastSearches[index];
        // Create a button  tag for our city
        // addEventListener
        const button = document.createElement('button');
        button.textContent = city;
        document.querySelector('#past-searches').append(button);
        button.addEventListener('click', function (event) {
            event.preventDefault();

            document.querySelector('#search-input').value = city; // This is just for display sake
            getWeather(city);
            getForecast(city);
        })

    }
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('Please enter a city');
        return;
    }

    getWeather(searchInputVal);
    getForecast(searchInputVal);
    saveCity(searchInputVal);
    displayPastSearches();
}

searchBtnEl.addEventListener('click', handleSearchFormSubmit);