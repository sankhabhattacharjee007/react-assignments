import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherStats from './components/WeatherStats';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { RefreshCwIcon } from './components/Icons';
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  DEFAULT_API_KEY
} from './services/weatherApi';

export default function App() {
  const [city, setCity] = useState(() => {
    return localStorage.getItem('weather_dashboard_city') || '';
  });
  const [currentCoords, setCurrentCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' (°C) or 'imperial' (°F)
  
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || DEFAULT_API_KEY;

  /**
   * Loads weather by city name using fetch + async/await
   */
  const loadWeatherByCity = useCallback(
    async (cityName, currentUnit = unit) => {
      setLoading(true);
      setError(null);
      setCurrentCoords(null);

      try {
        const data = await fetchWeatherByCity(cityName, apiKey, currentUnit);
        setWeatherData(data);
        setCity(data.city);
        localStorage.setItem('weather_dashboard_city', data.city);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.message || 'Failed to fetch weather data. Please try again.');
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    },
    [unit, apiKey]
  );

  /**
   * Loads weather using exact device coordinates (latitude, longitude)
   */
  const loadWeatherByCoords = useCallback(
    async (lat, lon, currentUnit = unit) => {
      setLoading(true);
      setError(null);
      setCurrentCoords({ lat, lon });

      try {
        const data = await fetchWeatherByCoords(lat, lon, apiKey, currentUnit);
        setWeatherData(data);
        setCity(data.city);
        localStorage.setItem('weather_dashboard_city', data.city);
      } catch (err) {
        console.error('Weather coords error:', err);
        setError(err.message || 'Failed to fetch weather for current location.');
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    },
    [unit, apiKey]
  );

  /**
   * Requests device location from browser Geolocation API
   */
  const requestDeviceLocation = useCallback(() => {
    if (!navigator.geolocation) {
      loadWeatherByCity(city || 'London', unit);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        loadWeatherByCoords(latitude, longitude, unit);
      },
      (geoError) => {
        console.warn('Geolocation access declined or unavailable:', geoError.message);
        // Fallback to saved city or London
        loadWeatherByCity(city || 'London', unit);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [city, unit, loadWeatherByCoords, loadWeatherByCity]);

  /**
   * Pre-requisite: useEffect for initial load on component mount
   * Automatically detects and fetches current device location
   */
  useEffect(() => {
    requestDeviceLocation();
  }, []);

  const handleSearch = (newCity) => {
    loadWeatherByCity(newCity, unit);
  };

  const handleToggleUnit = (newUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    if (currentCoords) {
      loadWeatherByCoords(currentCoords.lat, currentCoords.lon, newUnit);
    } else {
      loadWeatherByCity(city || 'London', newUnit);
    }
  };

  const handleRefresh = () => {
    if (currentCoords) {
      loadWeatherByCoords(currentCoords.lat, currentCoords.lon, unit);
    } else {
      loadWeatherByCity(city || 'London', unit);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {/* Clean App Header */}
        <header className="app-header glass-panel">
          <div className="brand-logo">
            <span className="brand-icon">🌤️</span>
            <div>
              <h1 className="brand-name">Weather</h1>
              <p className="brand-sub">Live Device Location & Forecast</p>
            </div>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="icon-circle-btn"
              onClick={handleRefresh}
              disabled={loading}
              title="Refresh weather"
              aria-label="Refresh weather"
            >
              <RefreshCwIcon size={18} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </header>

        {/* Search Bar Component with Current Location Trigger */}
        <SearchBar
          onSearch={handleSearch}
          onUseCurrentLocation={requestDeviceLocation}
          isLoading={loading}
        />

        {/* Main Content Area */}
        <main className="dashboard-content">
          {loading && (
            <LoadingSpinner
              message={
                currentCoords
                  ? 'Detecting device location & fetching live weather...'
                  : `Checking live weather for ${city || 'your area'}...`
              }
            />
          )}

          {!loading && error && (
            <ErrorMessage
              error={error}
              onRetry={handleRefresh}
            />
          )}

          {!loading && !error && weatherData && (
            <div className="weather-dashboard-view">
              {/* Primary Weather Hero Card */}
              <WeatherCard
                weather={weatherData}
                unit={unit}
                onToggleUnit={handleToggleUnit}
              />

              {/* Detailed Metrics: Humidity, Wind Speed, Sunrise, Sunset, Pressure, Visibility */}
              <WeatherStats
                weather={weatherData}
                unit={unit}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
