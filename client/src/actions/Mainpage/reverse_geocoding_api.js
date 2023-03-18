//https://us1.locationiq.com/v1/reverse?key=pk.63d9391567dcdc1500420ec9f07140eb&lat=28.3128562&lon=79.4227439&format=json
import axios from 'axios'

export const reverseGeocoding=(lat,lon)=>{
    const config={
        headers:{
            'Content-Type': 'application/json'
        },
        params:{
            key: 'pk.63d9391567dcdc1500420ec9f07140eb',
            lat:lat,
            lon: lon,
            format:'json'
        }
    }
    const data=axios.get(`https://us1.locationiq.com/v1/reverse`,config)
    return data
}