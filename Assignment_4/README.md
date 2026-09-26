# Assignment 4: Weather Dashboard using OpenWeatherMap API

A responsive Weather Dashboard built with **React**, **Vite**, and the **OpenWeatherMap API**.

---

## 🎯 Problem Statement & Requirements Fulfilled

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **API Integration** | Connects to OpenWeatherMap Current Weather Data endpoint | ✅ |
| **Fetch & Async/Await** | Asynchronous network calls with structured promise handling | ✅ |
| **useEffect** | Triggers automatic initial weather fetch on component mount | ✅ |
| **Temperature** | Displayed in large typography with **°C / °F** toggle switch | ✅ |
| **Humidity** | Displayed in % with comfort level indicator | ✅ |
| **Wind Speed** | Displayed in m/s and converted km/h | ✅ |
| **Weather Icon** | High-resolution official OpenWeatherMap icons with description | ✅ |
| **Sunrise & Sunset** | Formatted into local 12-hour AM/PM timestamps using timezone offset | ✅ |
| **Search by City** | Real-time search with input bar, clear button & popular quick chips | ✅ |
| **Loading Spinner** | Animated orb spinner and skeleton preview during API requests | ✅ |
| **Error Handling** | Dedicated error display for 404 (not found), 401 (auth), and network errors | ✅ |

---

## 🔑 Where & How to Get the Free API Key

OpenWeatherMap provides a **100% Free Tier** (1,000 free API calls per day):

1. **Sign Up**: Visit [OpenWeatherMap Sign Up](https://home.openweathermap.org/users/sign_up) and register.
2. **Confirm Email**: Check your inbox and click the verification email link.
3. **Get API Key**: Go to the [API Keys section](https://home.openweathermap.org/api_keys). Your default key is generated automatically.
4. **Activation Note**: Newly created OpenWeatherMap keys typically take **10 to 60 minutes** to activate.
5. **How to Use**:
   - **Method A (In-App)**: Click the **Demo Mode / Live API** button in the dashboard header, paste your key, and click **Save & Fetch**.
   - **Method B (.env file)**: Create a `.env` file in `Assignment_4/` with:
     ```env
     VITE_OPENWEATHER_API_KEY=your_32_character_api_key_here
     ```
   - **Instant Demo Mode**: If you haven't received your key yet or are waiting for activation, the app includes a **Demo Mode** toggle that simulates realistic live data for any city worldwide!

---

## 🚀 Running the Project Locally

```bash
cd Assignment_4
npm install
npm run dev
```

The application will run at: **http://localhost:5176/**
