import "./App.scss";
import Img1 from "./assets/w21.jpg";
import {useState} from 'react';
const api = {
  key: "1f5a41db1fa672eb9c2ab30bb79c95eb",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery("")
        setWeather(result)
      });
    }


  }



  const dateBuilder = (d) => {
    let months = ["january","February","March","April","May","June","July","August","September","October","November","December",];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date =d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="App">
      <img className={(typeof weather.main != "undefined") ?
      ((weather.main.temp > 25 ) ? 'ima warm' : (weather.main.temp < 15 ) ? 'ima cold' :'ima') :
      'ima'
    
    } src={Img1} alt="" />
      <div className="container">
      {(typeof weather.main != "undefined") ? ( 
          <div>
          <div className="location-box">
            <div className="location"> {weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div> 
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
         ) :('')}
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..."
          onChange={e=> setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
          </div>
          
      </div> 
    </div>
  );
}

export default App;
