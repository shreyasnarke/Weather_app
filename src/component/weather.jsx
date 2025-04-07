import React, { useState, useEffect } from "react";
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = "bf909b4a90c47e810fc156dc73c0ed75"; 
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(url);
        const data = await response.json();
      
        setWeather(data);
      } catch (error) {
        setWeather(null);
        console.error("Error fetching weather data:", error);
      }
      setLoading(false);
      
    });
  }, []);

  return (
    <div>
      <h2>Weather App</h2>
      {loading ? (
        <p>Loading...</p>
      ) : weather?.main && weather?.weather ? (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Unable to fetch weather data.</p>
      )}
    </div>
  );
  
};
export default Weather;