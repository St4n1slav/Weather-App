import { useState, useEffect } from "react";
import sunny from "../assets/img/sunny.png";
import cloudy from "../assets/img/cloudy.png";
import rainy from "../assets/img/rainy.png";
import snowy from "../assets/img/snowy.png";

const MyApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const api_key = "9570fd5209c9717ea2bbb3b9ef30f52c";

  useEffect(() => {
    const fetchDefaultWather = async () => {
      const defaultLocation = "Rome";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const resp = await fetch(url);
      const defaultData = await resp.json;
      setData(defaultData);
    };

    fetchDefaultWather();
  }, []);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const resp = await fetch(url);
      const searchData = await resp.json();
      if (searchData.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(searchData);
        setLocation("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImagesChange = data.weather ? weatherImages[data.weather[0].main] : null;

  /*const backgroundImage = {
    Clear: "linear-gradiet(to right, #f3b07c, #fcd283",
    Clouds: "linear-gradiet(to right, #57d6d4, #71eeec",
    Rain: "linear-gradiet(to right, #5bc8fb, #80eaff",
    Snow: "linear-gradiet(to right, #aff2ff, #ffffff",
    Haze: "linear-gradiet(to right, #57d6d4, #71eeec",
    Mist: "linear-gradiet(to right, #57d6d4, #71eeec",
  };

  const backgroundImageChange = data.weather ? backgroundImage[data.weather[0].main] : "linear-gradiet(to right, #f3b07c, #fcd283"; */

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  return (
    <div className="container" /*style={{ backgroundImageChange }}*/>
      <div className="MyApp" /*style={{ backgroundImage: backgroundImage && backgroundImage.replace ? backgroundImage.replace("to right", "to top") : null }}*/>
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Cera città" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
          {data.notFound ? (
            <div className="not-found">Not Found</div>
          ) : (
            <>
              <div className="weather">
                <img src={weatherImagesChange} alt="sunny" />
                <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
                <div className="weather-date">
                  <p>{formattedDate}</p>
                </div>
                <div className="weather-data">
                  <div className="humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{data.main ? data.main.humidity : null}%</div>
                    <div className="Wind">
                      <div className="data-name">Wind</div>
                      <i className="fa-solid fa-wind"></i>
                      <div className="data">{data.wind ? data.wind.speed : null} km/h</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApp;
