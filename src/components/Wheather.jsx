import React, { useState, useEffect } from "react";
import "./Wheather.css";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import { motion, AnimatePresence } from "framer-motion";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("day");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiKey = "9f733285e665b44e70d36f7e1c27cdd0";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      
      const response = await fetch(url);
      const result = await response.json();

      if (result.cod === "404") {
        setError("City not found. Please check the city name.");
        setData(null);
      } else {
        setData(result);
        // Determine time of day for background
        const currentHour = new Date().getHours();
        setTimeOfDay(currentHour >= 18 || currentHour <= 6 ? "night" : "day");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const mainCondition = condition?.toLowerCase();
    
    switch(mainCondition) {
      case 'clear':
        return <WbSunnyIcon className="weather-icon sunny" />;
      case 'clouds':
        return <CloudIcon className="weather-icon cloudy" />;
      case 'rain':
        return <UmbrellaIcon className="weather-icon rainy" />;
      case 'drizzle':
        return <WaterDropIcon className="weather-icon drizzle" />;
      case 'thunderstorm':
        return <ThunderstormIcon className="weather-icon storm" />;
      case 'snow':
        return <AcUnitIcon className="weather-icon snowy" />;
      default:
        return <FilterDramaIcon className="weather-icon misty" />;
    }
  };

  const getBackgroundGradient = () => {
    if (!data) return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    
    const condition = data.weather[0].main.toLowerCase();
    
    switch(condition) {
      case 'clear':
        return timeOfDay === 'day' 
          ? "linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #1E90FF 100%)"
          : "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)";
      case 'clouds':
        return "linear-gradient(135deg, #BBD2C5 0%, #536976 50%, #292E49 100%)";
      case 'rain':
        return "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)";
      case 'snow':
        return "linear-gradient(135deg, #E6DADA 0%, #274046 100%)";
      default:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div 
      className="weather-app"
      style={{ background: getBackgroundGradient() }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="app-background">
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        
        <div className="weather-container">
          {/* Header */}
          <motion.header 
            className="weather-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="logo">
              <WbSunnyIcon className="logo-icon pulse" />
              <h1>SkyCast</h1>
            </div>
            <div className="greeting">
              {getGreeting()}
            </div>
          </motion.header>

          {/* Search Section */}
          <motion.div 
            className="search-section"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="search-box glass">
              <div className="search-input-container">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="search-input"
                />
              </div>
              <motion.button 
                onClick={fetchWeather} 
                disabled={loading}
                className="search-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <span>Get Weather</span>
                    <SearchIcon />
                  </>
                )}
              </motion.button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {data && (
              <motion.div 
                className="weather-info"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {/* Main Weather Card */}
                <motion.div 
                  className="main-card glass"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="location-info">
                    <LocationOnIcon className="loc-icon" />
                    <h2>
                      {data.name}, {data.sys.country}
                      <span className="last-updated">
                        Updated {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </h2>
                  </div>
                  
                  <div className="main-weather-display">
                    <div className="temperature-section">
                      <motion.div 
                        className="temp-display"
                        key={data.main.temp}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <div className="current-temp">
                          {Math.round(data.main.temp)}°
                          <span className="temp-unit">C</span>
                        </div>
                        <div className="temp-feels">
                          Feels like {Math.round(data.main.feels_like)}°C
                        </div>
                      </motion.div>
                      
                      <div className="condition-display">
                        {getWeatherIcon(data.weather[0].main)}
                        <div>
                          <div className="condition-text">
                            {data.weather[0].description}
                          </div>
                          <div className="condition-details">
                            <span className="temp-range">
                              <ArrowUpwardIcon fontSize="small" />
                              {Math.round(data.main.temp_max)}°
                            </span>
                            <span className="temp-range">
                              <ArrowDownwardIcon fontSize="small" />
                              {Math.round(data.main.temp_min)}°
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Weather Stats Grid */}
                <div className="stats-grid">
                  <motion.div 
                    className="stat-card glass"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="stat-header">
                      <ThermostatIcon className="stat-icon temp-stat" />
                      <h3>Thermal</h3>
                    </div>
                    <div className="stat-value">{Math.round(data.main.temp)}°C</div>
                    <div className="stat-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${Math.min((data.main.temp + 10) * 3, 100)}%` }}
                      ></div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="stat-card glass"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="stat-header">
                      <WaterDropIcon className="stat-icon humidity-stat" />
                      <h3>Humidity</h3>
                    </div>
                    <div className="stat-value">{data.main.humidity}%</div>
                    <div className="stat-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${data.main.humidity}%` }}
                      ></div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="stat-card glass"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="stat-header">
                      <AirIcon className="stat-icon wind-stat" />
                      <h3>Wind</h3>
                    </div>
                    <div className="stat-value">{data.wind.speed} m/s</div>
                    <div className="wind-direction">
                      <div className="wind-arrow" style={{ transform: `rotate(${data.wind.deg}deg)` }}>
                        ➤
                      </div>
                      <span>{data.wind.deg}°</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="stat-card glass"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="stat-header">
                      <CompressIcon className="stat-icon pressure-stat" />
                      <h3>Pressure</h3>
                    </div>
                    <div className="stat-value">{data.main.pressure} hPa</div>
                    <div className="stat-trend">Normal</div>
                  </motion.div>
                </div>

                {/* Sunrise/Sunset Card */}
                <motion.div 
                  className="sun-card glass"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="sun-card-header">
                    <h3>Daylight</h3>
                    <WbTwilightIcon className="sun-icon" />
                  </div>
                  <div className="sun-times">
                    <div className="sun-event">
                      <Brightness6Icon className="sunrise-icon" />
                      <div>
                        <div className="sun-label">Sunrise</div>
                        <div className="sun-time">{formatTime(data.sys.sunrise)}</div>
                      </div>
                    </div>
                    <div className="sun-divider"></div>
                    <div className="sun-event">
                      <Brightness6Icon className="sunset-icon" />
                      <div>
                        <div className="sun-label">Sunset</div>
                        <div className="sun-time">{formatTime(data.sys.sunset)}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Additional Details */}
                <div className="additional-details">
                  <div className="detail-item">
                    <VisibilityIcon className="detail-icon" />
                    <div className="detail-text">
                      <span>Visibility</span>
                      <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <CloudIcon className="detail-icon" />
                    <div className="detail-text">
                      <span>Clouds</span>
                      <span className="detail-value">{data.clouds.all}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!data && !loading && !error && (
            <motion.div 
              className="welcome-screen glass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <WbSunnyIcon className="welcome-icon floating" />
              <h2>Discover Weather Anywhere</h2>
              <p>Enter a city name to get real-time weather updates</p>
              <div className="feature-tags">
                <span className="tag">🌡️ Temperature</span>
                <span className="tag">💨 Wind</span>
                <span className="tag">💧 Humidity</span>
                <span className="tag">🌅 Sunrise/Sunset</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Weather;