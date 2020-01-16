
fetchWeatherData = (latitude, longitude, tempUnit, apiKey, callback) => {
    /// Call open weather API to pull data
    fetch("https://api.openweathermap.org/data/2.5/find?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude + tempUnit
    ).then(function (response) {
        response.json().then(function (results) {
            if (results && results.list && results.list.length)
                callback(null, results);
            else
                callback("failed to load weather data ");
        });
    }).catch(function () {
        callback("failed to fetch weather data" );
    });
}

initView = (data) => {
    console.log(data);
    var weatherData;

    let tempUnit;
    if (data.tempUnit === 'metric')
        tempUnit = '&units=metric';
    else if (data.tempUnit === 'imperial')
        tempUnit = '&units=imperial';
    else
        tempUnit = '';

    fetchWeatherData(data.place.address.lat, data.place.address.lng, tempUnit, data.apiKey, (err, response) => {
        if (err) return console.log(err);
        weatherData = Object.assign(response.list[0]);
        
        let weatherStatus = response.list[0];
        console.log(weatherStatus)
        let temperature = parseInt(weatherStatus.main.temp);
        let formatedTemperature = temperature.toString();

        let minTemperature = parseInt(weatherStatus.main.temp_min);
        let formatedMinTemperature = minTemperature.toString();

        let maxTemperature = parseInt(weatherStatus.main.temp_max);
        let formatedMaxTemperature = maxTemperature.toString();

        let wind = weatherStatus.wind.speed.toString() + 'km/h';
        let humidity = weatherStatus.main.humidity.toString() + "%";
        
        let rain;
        if (weatherStatus.rain !== null)
            rain = Object.values(weatherStatus.rain)[0].toString() + 'mm';
        else
            rain = '0mm';
        
        let snow;
        if (weatherStatus.snow !== null)
            snow = Object.values(weatherStatus.snow).toString() + 'mm';
        else
            snow = '0mm';
        
        if (data.tempUnit === 'metric') {
            formatedTemperature += ' °C';
            formatedMinTemperature += ' °C';
            formatedMaxTemperature += ' °C';
        }
            
        else if (data.tempUnit === 'imperial') {
            formatedTemperature += ' F';
            formatedMinTemperature += ' F';
            formatedMaxTemperature += ' F';
        }  
        else {
            formatedTemperature += ' K'; 
            formatedMinTemperature += ' K'; 
            formatedMaxTemperature += ' K'; 
        }
            
        document.getElementById('location--title').innerHTML = data.place.title;
        document.getElementById('weather--information').innerHTML = formatedTemperature;
        document.getElementById('wind--information').innerHTML = wind;
        document.getElementById('rain--information').innerHTML = rain;
        document.getElementById('snow--information').innerHTML = snow;
        document.getElementById('humidity--information').innerHTML = humidity;
        document.getElementById('min-temp--information').innerHTML = formatedMinTemperature;
        document.getElementById('max-temp--information').innerHTML = formatedMaxTemperature;
    })
}
    