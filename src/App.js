import hotBg from './asserts/hot.jpg';
import coldBg from './asserts/cold.jpg';
import './App.css';
import Description from './components/Description';
import { useEffect } from 'react';
import { useState } from 'react';
import { getFormattedWeatherData } from './weatherservice';

function App() {
  const [city,setCity]=useState("paris");
  const [weather,setWeather]=useState(null);
  const [units,setUnits]=useState("imperial");
  const [bg,setBg]=useState(hotBg);
  useEffect(()=>{
    const fetchWeatherData=async()=>{
    const data=await getFormattedWeatherData(city,units);
    setWeather(data)

    //dynamic BG
    const th=units==='metric'?20:65;
    if(data.temp<=th) setBg(coldBg);
    else setBg(hotBg);
      };
    fetchWeatherData();
  },[units,city])

  const handleUnitsClick=(e)=>{
    const button=e.currentTarget;
    const currentUnit=button.innerText.slice(0);
    const isCelcius=currentUnit==="C";
    button.innerText=isCelcius?"F":"C";
    setUnits(isCelcius?"metric":"imperial");
  }
  const enterKey=(e)=>{
    if(e.keyCode===13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
            <div className="overlay">
              {weather && (
                  <div className="container">
                  <div className="section section__inputs">
                      <input onKeyDown={enterKey}type="text" name="city" placeholder="Enter City.." />
                      <button onClick={(e)=>handleUnitsClick(e)} >&deg;F</button>
                      </div>
                <div className="section section__temparature">
                  <div className="icon">
                    <h3>{`${weather.name},${weather.country}`}</h3>
                    <img src={weather.iconURL} alt="weatherIcon" />
                    <h3>{weather.description}</h3>
                  </div>
                  <div className="temparature">
                    <h1>{weather.temp} {units==="metric" ? "C" : "F"}</h1>
                  </div>
                  </div>
                  <Description weather={weather} units={units}/>
                </div>
              )}
              
            </div> 
    </div>
  );
}

export default App;
