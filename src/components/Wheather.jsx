import React, { useState } from "react";
import "./Wheather.css";
import CloudSnowingIcon from '@mui/icons-material/CloudySnowing'
import CloudIcon from '@mui/icons-material/Cloud'
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WindPowerIcon from '@mui/icons-material/WindPower';
import WaterDropIcon from '@mui/icons-material/WaterDrop'

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = "9f733285e665b44e70d36f7e1c27cdd0";
    const url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const result = await response.json();

    if (result.cod === "404") {
      alert("City not found!");
      setData(null);
    } else {
      setData(result);
    }
  };

  return (
    <div className="weather-container">
      <h2 style={{textAlign:'center'}} ><CloudSnowingIcon style={{ color:'orange',marginRight:'10px'}} />Weather App</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {data && (
        <div className="weather-card">
          <h3>{data.name}</h3>
          <p><ThermostatIcon style={{}} /> Temperature: {data.main.temp}°C</p>
          <p><CloudIcon/> Condition: {data.weather[0].description}</p>
          <p><WindPowerIcon/> Wind: {data.wind.speed} km/h</p>
          <p><WaterDropIcon/> Humidity: {data.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
