import axios from "axios";
import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Country({ data }) {
  const [tempInfo, setTempInfo] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.latlng[0]}&lon=${data.latlng[1]}&appid=${API_KEY}`
      )
      .then((res) => {
        setTempInfo(res.data);
      });
  }, []);

  return (
    <div>
      <h2>{data.name.common}</h2>
      <p>Capital: {data.capital}</p>
      <p>Area: {data.area}</p>
      <div>
        <strong>Languages</strong>
        <ul>
          {Object.entries(data.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      </div>
      <img src={data.flags.png} alt={data.flags.alt} />
      <h3>Weather in {data.capital}</h3>
      {tempInfo.main && (
        <>
          <p>
            Temperature: {(tempInfo.main.temp - 273.15).toFixed(2)} Celsius /{" "}
            {(((tempInfo.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)}{" "}
            Fahrenheit
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${tempInfo.weather[0].icon}@2x.png`}
            alt={tempInfo.weather[0].description}
          />
          <p>Wind: {tempInfo.wind.speed}</p>
        </>
      )}
    </div>
  );
}

export default Country;
