import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
import { BiSearch } from 'react-icons/bi'
import { BsThermometerHalf } from 'react-icons/bs'
import RingLoader from "react-spinners/RingLoader";

const weatherStatus = [
  {
    type: 'Clear',
    img: 'https://cdn-icons-png.flaticon.com/512/6974/6974833.png',
  },
  {
    type: 'Rain',
    img: 'https://cdn-icons-png.flaticon.com/512/3351/3351979.png',
  },
  {
    type: 'Snow',
    img: 'https://cdn-icons-png.flaticon.com/512/642/642102.png',
  },
  {
    type: 'Clouds',
    img: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
  },
  {
    type: 'Haze',
    img: 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
  },
  {
    type: 'Smoke',
    img: 'https://cdn-icons-png.flaticon.com/512/4380/4380458.png',
  },
  {
    type: 'Mist',
    img: 'https://cdn-icons-png.flaticon.com/512/4005/4005901.png',
  },
  {
    type: 'Drizzle',
    img: 'https://cdn-icons-png.flaticon.com/512/3076/3076129.png',
  },
];

const err_img = 'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg';



const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c533f16896341a4f8ef49c6d1c16e89&units=metric`);
      setWeather(response.data);
      setError(false);
      setLoading(false);
    } catch (error) {
      setWeather(null);
      setError(true);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const getIconUrl = (iconType) => {
    const iconData = weatherStatus.find((data) => data.type.toLowerCase() === iconType.toLowerCase());
    return iconData ? iconData.img : '';
  };

  const renderWeather = () => {
    if (!weather) {
      return null;
    }
    if (loading) {
      return <div><RingLoader/></div>;
    }

    const weatherDescription = weather.weather[0].description;
    const weatherIconType = weather.weather[0].main;
    const weatherIconUrl = getIconUrl(weatherIconType);

    return (
      <div className='weather-info'>
        <h1>{weather.name}, {weather.sys.country}</h1>
        {weatherIconUrl && <img src={weatherIconUrl} alt={weatherDescription} />}
        <h1>{weatherDescription}</h1>
        <span><BsThermometerHalf/>{weather.main.temp}°C</span>
      </div>
    );
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={city} placeholder='Enter a city' onChange={handleChange} />
          <button type="submit"><BiSearch size={40}/></button>
        </form>
        <div className='weather-info'>
          {error && <img src={err_img} alt="Error" />}
          {renderWeather()}
        </div>
      </div>
    </div>
  );
};

export default App;