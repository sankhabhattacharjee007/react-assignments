/**
 * OpenWeatherMap API Service
 * Pure live OpenWeatherMap API integration (City & Device Coordinates)
 */

export const DEFAULT_API_KEY = 'b7eb4ac7fe466a04b7be9fa9c6fed9c4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Normalizes OpenWeatherMap API raw response into clean structured UI state
 */
export function normalizeWeatherData(raw) {
  return {
    city: raw.name,
    country: raw.sys?.country || '',
    coord: raw.coord || { lat: 0, lon: 0 },
    temp: Math.round(raw.main?.temp),
    feels_like: Math.round(raw.main?.feels_like),
    temp_min: Math.round(raw.main?.temp_min),
    temp_max: Math.round(raw.main?.temp_max),
    humidity: raw.main?.humidity,
    pressure: raw.main?.pressure,
    wind_speed: raw.wind?.speed,
    wind_deg: raw.wind?.deg ?? 0,
    weather_main: raw.weather?.[0]?.main || 'Clear',
    weather_description: raw.weather?.[0]?.description || '',
    weather_icon: raw.weather?.[0]?.icon || '01d',
    sunrise: raw.sys?.sunrise,
    sunset: raw.sys?.sunset,
    timezone: raw.timezone || 0,
    clouds: raw.clouds?.all ?? 0,
    visibility: raw.visibility ? (raw.visibility / 1000).toFixed(1) : '10',
    timestamp: raw.dt ? raw.dt * 1000 : Date.now()
  };
}

/**
 * Fetches live weather for a city name
 */
export async function fetchWeatherByCity(cityName, apiKey = DEFAULT_API_KEY, unit = 'metric') {
  if (!cityName || !cityName.trim()) {
    throw new Error('Please enter a city name.');
  }

  const cleanCity = cityName.trim();
  const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_API_KEY;
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(cleanCity)}&units=${unit}&appid=${keyToUse}`;

  return performWeatherFetch(url, cleanCity);
}

/**
 * Fetches live weather using exact device coordinates (latitude, longitude)
 */
export async function fetchWeatherByCoords(lat, lon, apiKey = DEFAULT_API_KEY, unit = 'metric') {
  const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_API_KEY;
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${keyToUse}`;

  return performWeatherFetch(url, 'Current Location');
}

async function performWeatherFetch(url, queryLabel) {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error('Network error: Unable to connect to OpenWeatherMap. Please check your internet connection.');
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Location "${queryLabel}" not found. Please verify the name and try again.`);
    } else if (response.status === 401) {
      throw new Error(
        'OpenWeatherMap API Key error (HTTP 401). Please check that your key is valid and active.'
      );
    } else if (response.status === 429) {
      throw new Error('OpenWeatherMap API rate limit exceeded. Please wait a moment before trying again.');
    } else {
      throw new Error(`OpenWeatherMap API error: ${response.statusText || response.status}`);
    }
  }

  const data = await response.json();
  return normalizeWeatherData(data);
}

/**
 * Format unix timestamp into user-friendly time string (e.g. "06:24 AM")
 * Accounts for city timezone offset in seconds.
 */
export function formatUnixTime(unixSeconds, timezoneOffsetSeconds = 0) {
  if (!unixSeconds) return '--:--';
  const utcMillis = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(utcMillis);

  return date.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Formats full date (e.g. "Wednesday, Sep 23, 2026")
 */
export function formatCurrentDate(timestamp = Date.now()) {
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
