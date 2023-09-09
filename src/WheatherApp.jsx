import React, { useState } from 'react'

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = '50d7862de39295f61230c27daf76cc51'
    

    const [ciudad, setCiudad] = useState('')
    const [data, setData] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }
    
    const fetchClima = async () => {
        try {
            const res = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
            const data = await res.json()
            setData(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <h1>Aplicación de Clima</h1>

            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                value={ciudad}
                onChange={handleCambioCiudad}
                />
                <button type='submit'>Buscar</button>
            </form>
            {data && (
                <div>
                    <h2>Ciudad: {data.name}</h2>
                    <h3>Temperatura: {data.main?.temp - 273.15} °C</h3>
                    <h3>Humedad: {data.main.humidity} %</h3>
                    <h3>Presión: {data.main.pressure} hPa</h3>
                    <h3>Descripción: {data.weather[0].description}</h3>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                </div>
            )}
        </div>
    )
}
