import React from 'react';
import {
  HumidityIcon,
  WindIcon,
  SunriseIcon,
  SunsetIcon,
  GaugeIcon,
  EyeIcon
} from './Icons';
import { formatUnixTime } from '../services/weatherApi';

export default function WeatherStats({ weather, unit }) {
  if (!weather) return null;

  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';
  // Also calculate km/h for convenience if metric
  const windKmh = unit === 'metric' ? `(${(weather.wind_speed * 3.6).toFixed(1)} km/h)` : '';

  const sunriseFormatted = formatUnixTime(weather.sunrise, weather.timezone);
  const sunsetFormatted = formatUnixTime(weather.sunset, weather.timezone);

  const stats = [
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${weather.humidity}%`,
      subText: weather.humidity > 70 ? 'High Humidity' : weather.humidity < 30 ? 'Dry Air' : 'Comfortable',
      icon: <HumidityIcon size={24} className="stat-svg text-blue" />,
      colorClass: 'humidity-accent'
    },
    {
      id: 'wind',
      label: 'Wind Speed',
      value: `${weather.wind_speed} ${windSpeedUnit}`,
      subText: windKmh || `${weather.wind_deg}° direction`,
      icon: <WindIcon size={24} className="stat-svg text-teal" />,
      colorClass: 'wind-accent'
    },
    {
      id: 'sunrise',
      label: 'Sunrise',
      value: sunriseFormatted,
      subText: 'Dawn / Morning',
      icon: <SunriseIcon size={24} className="stat-svg text-amber" />,
      colorClass: 'sunrise-accent'
    },
    {
      id: 'sunset',
      label: 'Sunset',
      value: sunsetFormatted,
      subText: 'Dusk / Evening',
      icon: <SunsetIcon size={24} className="stat-svg text-orange" />,
      colorClass: 'sunset-accent'
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      subText: weather.pressure > 1013 ? 'High pressure' : 'Low pressure',
      icon: <GaugeIcon size={24} className="stat-svg text-indigo" />,
      colorClass: 'pressure-accent'
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: `${weather.visibility} km`,
      subText: weather.visibility >= 10 ? 'Clear view' : 'Moderate haze',
      icon: <EyeIcon size={24} className="stat-svg text-emerald" />,
      colorClass: 'visibility-accent'
    }
  ];

  return (
    <div className="weather-stats-grid">
      {stats.map((stat) => (
        <div key={stat.id} className={`stat-card glass-panel ${stat.colorClass}`}>
          <div className="stat-card-top">
            <span className="stat-label">{stat.label}</span>
            <div className="stat-icon-badge">{stat.icon}</div>
          </div>
          <div className="stat-card-bottom">
            <h3 className="stat-value">{stat.value}</h3>
            {stat.subText && <span className="stat-subtext">{stat.subText}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
