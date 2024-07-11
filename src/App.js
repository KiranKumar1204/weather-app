import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loc, setLoc] = useState("");

  const fetchWeatherData = async () => {
    console.log(loc)
    try {
      const response = await fetch(`https://open-weather13.p.rapidapi.com/city/${loc}/EN`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '1fbd85f483msh0983156198fdeacp15ba09jsnf29f518de831',
          'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result) {
        const celsius = convertToFahrenheitToCelsius(result.main.temp);
        const feelsLikeCelsius = convertToFahrenheitToCelsius(result.main.feels_like);
        setData({ ...result, main: { ...result.main, temp: celsius, feels_like: feelsLikeCelsius } });
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (error) {
      console.error(error);
    
    }
  };

  const convertToFahrenheitToCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * (5 / 9));
  };


  return (
    <div className="App">
      <input 
        name="loc" 
        
        onChange={(e)=>{setLoc(e.target.value)}} 
      />
      <button onClick={fetchWeatherData}>Get Weather Data</button>
      {data && (
        <div className="weather-info">
          <h2>Weather in {data.name}</h2>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Feels Like: {data.main.feels_like}°C</p>
          <p>Weather: {data.weather[0].description}</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
