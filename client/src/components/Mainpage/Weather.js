import { useState, useEffect } from 'react'
import { findCityWeather } from '../../actions/Mainpage/weather_api';
import { get } from 'lodash';
import { reverseGeocoding } from '../../actions/Mainpage/reverse_geocoding_api';

function Weather() {
    const [weatherData, setWeatherData] = useState('')
    const [cityName, setCityName] = useState('')
    const [currentCity, setCurrentCity] = useState('')

    useEffect(() => {
        //const Geolocation = Navigator.geolocation
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        function success(pos) {
            const crd = pos.coords;
            console.log(`Your current position is:> Latitude : ${crd.latitude} Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            reverseGeoCode(crd.latitude,crd.longitude)
        }
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, [])

    const reverseGeoCode =(lat,lon)=>{
         reverseGeocoding(lat,lon).then((res) => {
            let data = get(res, 'data', [])
            setCurrentCity(data)
        })
    }

    useEffect(() => {
        const cityname = get(currentCity, 'address.city', '')
        cityname && findCityWeather(cityname).then((res) => {
            let data = get(res, 'data', [])
            setWeatherData(data)
        })
    }, [currentCity])

    const handleCityname = (e) => {
        setCityName(e.target.value)
    }
    
    const findTemperature = () => {
        findCityWeather(cityName).then((res) => {
            let data = get(res, 'data', [])
            setWeatherData(data)
        })
    }

    const findTemperatureEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            findTemperature()
        }
    }

    const getTempInCelcius = () => {
        let temp = get(weatherData, 'main.temp') - 273.15
        return temp.toFixed(2)
    }

    return (
        <div className="ip-address" >
            <div style={{ display: 'flex' }}>
                <input placeholder='Cityname' style={{ width: '100%' }} onKeyDownCapture={findTemperatureEnter} onChange={handleCityname}></input>
                <button onClick={findTemperature} >Search</button>
            </div>
            {cityName ?
                <div style={{ backgroundColor: 'lightskyblue', margin: 0 }}>
                    <h4 style={{ margin: 0 }}> {weatherData.name}</h4>
                    <p style={{ paddingBottom: '14px' }}> {getTempInCelcius()} <sup>O</sup>C </p>
                </div> : <div style={{ backgroundColor: 'lightskyblue', margin: 0 }}>
                    <h4 style={{ margin: 0 }}> {get(currentCity, 'address.city', '')}</h4>
                    {getTempInCelcius() && <p style={{ paddingBottom: '14px' }} >{getTempInCelcius()} <sup>O</sup>C </p>}
                </div>
            }
        </div>
    );
}

export default Weather

