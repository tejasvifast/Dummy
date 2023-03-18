import { useState, useEffect } from 'react'
import axios from 'axios'

function IpAddress() {
    const [ip, setIP] = useState('');
    const [toggle, setToggle] = useState(true)

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    useEffect(() => {
        getData()
    }, [])

    const toggleFunction = () => {
        setToggle(!toggle)
    }

    return (
        <div className="ip-address" >
            {toggle ? (
                <>
                    <button onClick={() => toggleFunction()} style={{ width: '100px', backgroundColor: 'lightgreen' }}>SHOW IP</button>
                    <h2 style={{ backgroundColor: 'lightgreen' }}> Your IP is Waiting</h2>
                </>
            ) : (
                <>
                    <button onClick={() => toggleFunction()} style={{ width: '100px', backgroundColor: 'red' }}>HIDE IP</button>
                    <h2 style={{ backgroundColor: 'lightgreen' }}>{ip}</h2>
                </>
            )}
        </div>
    );
}


export default IpAddress