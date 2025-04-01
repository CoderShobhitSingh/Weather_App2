import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    temp: 0,
    description: "-------------",
    humidity: 0,
    windSpeed: 0,
    icon: "/404.png"
  });
  const apiKey = "c7819e590bf6809c79dac20176b85cac";

  const checkWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather({
          temp: Math.round(data.main.temp - 273.15),
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: getWeatherIcon(data.weather[0].main)
        });
      } else {
        setWeather({
          temp: 0,
          description: "-------------",
          humidity: 0,
          windSpeed: 0,
          icon: "/404.png"
        });
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Haze: "/cloud.png",
      "overcast clouds": "/cloudy.png",
      Clear: "/clear.png",
      Rain: "/rain.png",
      Mist: "/mist.png",
      Thunderstorm: "/snow.png",
      Clouds: "/cloudy.png"
    };
    return icons[condition] || "/404.png";
  };

  return (
    <div className="card">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter City name" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkWeather()}
        />
        <button onClick={checkWeather}>
          <img src="/search_24dp_000000_FILL0_wght500_GRAD0_opsz24.png" alt="Search" />
        </button>
      </div>
      <div className="weather-img">
        <img className="weather-img-status" src={weather.icon} alt="Weather" />
      </div>
      <div className="report">
        <p className="temp">{weather.temp}<sup>°C</sup></p>
        <p className="status">{weather.description}</p>
      </div>
      <div className="surr-info">
        <div className="wind-speed">
          <img src="/air_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" alt="Wind" />
          <sup className="wind-speed-info">{weather.windSpeed}Km/h</sup>
        </div>
        <div className="hum">
          <img src="/humidity_percentage_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" alt="Humidity" />
          <sup className="hum-info">{weather.humidity}%</sup>
        </div>
      </div>
    </div>
  );
};

export default App;