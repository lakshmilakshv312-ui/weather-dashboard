const apiKey = "063c1a999c8c7e281ea069562dd9ae82";

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("weatherResult").innerHTML = "City not found!";
                return;
            }

            document.getElementById("weatherResult").innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            `;

            getForecast(city);
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML = "Error fetching data!";
        });
}

function getForecast(city) {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {

            const forecastDiv = document.getElementById("forecast");
            forecastDiv.innerHTML = "";

            for (let i = 0; i < data.list.length; i += 8) {

                const day = data.list[i];

                forecastDiv.innerHTML += `
                    <div class="forecast-card">
                        <p>${new Date(day.dt_txt).toDateString()}</p>
                        <p>${day.main.temp} °C</p>
                        <p>${day.weather[0].description}</p>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                    </div>
                `;
            }
        });
}