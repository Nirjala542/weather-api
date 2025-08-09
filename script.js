function getWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();
    const apiKey = "5f30dfd260e099ea9b9e644d5d72d19b";
    const loader = document.getElementById("loader");
    const result = document.getElementById("weatherResult");

    // Clear old data
    result.innerHTML = "";

    if (!city) {
        result.innerHTML = `<div class="alert alert-warning">Please enter a city name!</div>`;
        return;
    }

    loader.classList.remove("d-none");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            loader.classList.add("d-none");

            if (data.cod !== 200) {
                result.innerHTML = `<div class="alert alert-danger">City not found. Please try again.</div>`;
                return;
            }

            // Weather data
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            const temp = data.main.temp.toFixed(1);
            const feelsLike = data.main.feels_like.toFixed(1);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const description = data.weather[0].description;

            // Show in card
            result.innerHTML = `
                <div class="col-12 col-md-6">
                    <div class="weather-card">
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <img src="${icon}" alt="Weather Icon" class="mb-2 weather-icon">
                        <p class="lead text-capitalize">${description}</p>
                        <p><strong>Temperature:</strong> ${temp}°C</p>
                        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
                        <p><strong>Humidity:</strong> ${humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            loader.classList.add("d-none");
            result.innerHTML = `<div class="alert alert-danger">Error fetching data. Please try again.</div>`;
            console.error(error);
        });
}
