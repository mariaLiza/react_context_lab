import React, { useState, useEffect } from "react";
import "../css/Weather.css";
import apiKey from "../secret";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";

export const farenheit = temp => {
  return (temp - 273.15) * 1.8 + 32;
};

const Weather = () => {
  const [location, setLocation] = useState([]);
  const [yourLocation, setYourLocation] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [weather, setWeather] = useState([]);
  const [feelsLike, setFeelsLike] = useState("");
  const [uvi, setUvi] = useState("");
  const [dew, setDew] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  // const [currentStats, setCurrentStats] = useState([]);

  const getAddress = async () => {
    await navigator.geolocation;
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      setLocation([lat, long]);
    });
  };
  console.log(location);

  let lat = location[0];
  let lon = location[1];

  const getWeather = async () => {
    try {
      let realTemp = 0;
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
      // );
      let res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}
      `);
      // debugger;
      setYourLocation(res.data.timezone);
      const stat = res.data.current;
      let temp = stat.temp;
      realTemp = (Math.round(farenheit(temp)));
      setTemperature(realTemp);
      setWeather(res.data.current.weather[0].description);
      setFeelsLike(Math.round(farenheit(stat.feels_like)));
      setUvi(Math.round(stat.uvi));
      setDew(Math.round(farenheit(stat.dew_point)));
      setPressure(stat.pressure);
      setHumidity(stat.humidity);
      // console.log(feelsLike, minTemp, maxTemp, pressure, humidity)
    } catch (error) {
      console.log(error);
      document.title = "ERROR";
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div>
      <h1 id="heading">Weather</h1>
      {/* <h2> {yourLocation} </h2> */}
      <div>
        <h2> {`${temperature}`}&#x00B0;</h2>
        <h2>{weather}</h2>
        <ul className="today">
          <li><p>Feels Like</p>{feelsLike}&#x00B0;</li>
          <li><p>UVI</p>{uvi}</li>
          <li><p>Dew</p>{dew}&#x00B0;</li>
          <li><p>Pressure</p>{pressure}</li>
          <li><p>Humidity</p>{humidity}</li>
        </ul>
      <button onClick={getWeather}>Get Your Local Weather</button>
      </div>
      <WeatherDisplay location={location} />
    </div>
  );
};

export default Weather;
