const apiKey = "ab22f275090fa7eda8c8c1c7db9421b2"; // यहाँ अपनी OpenWeatherMap API key डालें
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        fetchWeather(city);
    }
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            fetchWeather(city);
        }
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById("condition").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = `${data.main.humidity}%`;
            document.getElementById("windSpeed").innerText = `${data.wind.speed} km/h`;

            weatherInfo.style.display = "block";
            errorMsg.style.display = "none";
        } else {
            weatherInfo.style.display = "none";
            errorMsg.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong!");
    }
}