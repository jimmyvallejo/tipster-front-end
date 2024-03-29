import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import moment from "moment";
import { mobileService } from "../services/mobileService";

const WeatherApp = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState([]);

  let WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${WEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };

    if (lat !== null && long !== null) {
      fetchData();
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
  }, [lat, long]);

  return (
    <>
      {data && data.main ? (
        <div className="weather">
          <div className="main">
            <p className="header">{data.name}</p>
            <div className="flex">
              <p className="day">
                {moment().format("dddd")}, <span>{moment().format("LL")}</span>
              </p>
              <p className="description">{data.weather[0].main}</p>
            </div>
            <div className="flex">
              <p className="temp">
                Temperature: {Math.round((data.main.temp * 9) / 5 + 32)} &deg;F
              </p>
              <p className="temp">Humidity: {data.main.humidity} %</p>
            </div>
            <div className="flex">
              {window.innerWidth > mobileService && (
                <p className="sunrise-sunset">
                  Sunrise:{" "}
                  {new Date(data.sys.sunrise * 1000).toLocaleTimeString(
                    "en-IN"
                  )}
                </p>
              )}

              {window.innerWidth > mobileService && (
                <p className="sunrise-sunset">
                  Sunset:{" "}
                  {new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN")}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader>Loading...</Loader>
      )}
    </>
  );
};

export default WeatherApp;
