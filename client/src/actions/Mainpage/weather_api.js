import axios from 'axios'

export const findCityWeather=(cityName)=>{
    const config={
        headers:{
            'Content-Type': 'application/json'
        },
        params:{
            q: cityName,
            appid:'42ad3584d4bbbe0906c2c22338536300'
        }
    }
    const data=axios.get(`https://api.openweathermap.org/data/2.5/weather`,config)
    return data
}