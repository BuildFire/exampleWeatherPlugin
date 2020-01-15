
fetchWeatherData = (latitude, longitude, apiKey, callback) => {
    /// Call open weather API to pull data
    fetch("https://api.openweathermap.org/data/2.5/find?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude
    ).then(function (response) {
        response.json().then(function (results) {
            console.log("????", response);
            if (results && results.list && results.list.length)
                callback(null, results);
            else
                callback("failed to load weather data ");
        });
    }).catch(function () {
        callback("failed to fetch weather data" );
    });
}

initView = () => {
    Settings.get((err, data) => {
        if (err) return console.log(err);
        document.getElementById('location--title').innerHTML = data.place.title;
        fetchWeatherData(data.place.address.lat, data.place.address.lng, data.apiKey, (err, response) => {
            if (err) return console.log(err);
            console.log(response);

            let weatherStatus = response.list[0];
            document.getElementById('weather--information').innerHTML = weatherStatus.main.temp;
        })
    });
}
    