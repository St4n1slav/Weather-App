import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import sunny from "../assets/img/sunny.png";
import cloudy from "../assets/img/cloudy.png";
import rainy from "../assets/img/rainy.png";
import snowy from "../assets/img/snowy.png";

//Mi sono ispirato molto a un progetto simile che avevo trovato su internet

const MyApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const api_key = "9570fd5209c9717ea2bbb3b9ef30f52c";

  useEffect(() => {
    const fetchDefaultWather = async () => {
      const defaultLocation = "Rome";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const resp = await fetch(url);
      const defaultData = await resp.json();
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

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  return (
    <Container>
      <div className="MyApp">
        <div className="search">
          <div className="search-top">
            <Row className="location">
              <Col>
                <i className="fa-solid fa-location fa-location-dot"></i>
              </Col>
              <Col>
                <div>{data.name}</div>
              </Col>
            </Row>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Cera città" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
          {data.notFound ? (
            <div className="not-found">Not Found</div>
          ) : (
            <>
              <img className="image" src={weatherImagesChange} alt="sunny" />
              <div className="weather">
                <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
                <div className="weather-date">
                  <p>{formattedDate}</p>
                </div>
              </div>
              <Row className="weather-data">
                <Col className="card">
                  <div className="humidity"></div>
                  <div className="data-name">Humidity</div>
                  <i className="fa-solid fa-droplet"></i>
                  <div className="data">{data.main ? data.main.humidity : null}%</div>
                </Col>
                <Col className="card">
                  <div className="Wind">
                    <div className="data-name">Wind</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{data.wind ? data.wind.speed : null} km/h</div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyApp;
