import React from 'react';
import { MapPinIcon, ThermometerIcon } from './Icons';
import { formatCurrentDate } from '../services/weatherApi';

export default function WeatherCard({ weather, unit, onToggleUnit }) {
  if (!weather) return null;

  const tempUnitSymbol = unit === 'metric' ? '°C' : '°F';
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather_icon}@4x.png`;

  return (
    <div className="weather-card glass-panel">
      <div className="weather-card-header">
        <div className="location-info">
          <div className="city-title-row">
            <MapPinIcon size={22} className="pin-icon" />
            <h2 className="city-name">{weather.city}</h2>
            {weather.country && <span className="country-badge">{weather.country}</span>}
          </div>
          <p className="current-date">{formatCurrentDate(weather.timestamp)}</p>
        </div>

        <div className="unit-toggle-wrapper">
          <button
            type="button"
            className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
            onClick={() => onToggleUnit('metric')}
          >
            °C
          </button>
          <span className="unit-divider">|</span>
          <button
            type="button"
            className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
            onClick={() => onToggleUnit('imperial')}
          >
            °F
          </button>
        </div>
      </div>

      <div className="weather-card-body">
        <div className="temperature-visual">
          <div className="weather-icon-container">
            <img
              src={iconUrl}
              alt={weather.weather_description}
              className="weather-main-icon"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="temp-numbers">
            <div className="temp-large">
              {weather.temp}
              <span className="degree-symbol">{tempUnitSymbol}</span>
            </div>
            <p className="weather-desc-text">{weather.weather_description}</p>
          </div>
        </div>

        <div className="temp-sub-details">
          <div className="temp-pill">
            <ThermometerIcon size={16} />
            <span>Feels like: <strong>{weather.feels_like}{tempUnitSymbol}</strong></span>
          </div>
          <div className="temp-range-pill">
            <span className="high-temp">H: {weather.temp_max}{tempUnitSymbol}</span>
            <span className="low-temp">L: {weather.temp_min}{tempUnitSymbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
