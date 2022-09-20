import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import Spinner from "./Spinner";

export default function DetailInform(props) {
    const [daysWeather, setDaysWeather] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const cityName = useSelector(state => state.selectedCity);

    const getData = async (city) => {
        setIsLoading(true)

        let dateStart = ((new Date(new Date().setDate(new Date().getDate() - 30)))).toISOString().slice(0, 10);
        let dateEnd = (new Date(new Date().setDate(new Date().getDate() - 1))).toISOString().slice(0, 10);

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${dateStart}/${dateEnd}/?unitGroup=metric&include=current&key=MMNGBKJKHAGZV8FFRJ26AQ6HZ&contentType=json`;

        let req = await axios.get(url).then(res => setDaysWeather(res.data.days)).catch(err => {
            if (err.response.status == 400)
                alert('полная информация по городу не найдена')
        })

        setIsLoading(false)
    }

    useEffect(() => {
        if (cityName.cityName) {
            getData(cityName.cityName)
        }
    }
        , [cityName])

    return (
        !!cityName.cityName ?
            daysWeather[0] ?
                isLoading ?
                    <Spinner /> :
                    <React.Fragment>
                        <div className="detail-inform__header">Погода в городе {cityName.cityName} за последние 30 дней</div>
                        <div className="detail-inform">
                            {daysWeather.map((day, index) => (
                                <div key={index} className='detail-inform__cell'>
                                    <p className="detail-inform__date">{day.datetime}</p>
                                    <p className="detail-inform__temp">Температура<br /> {day.temp}°C</p>
                                    <p className="detail-inform__wind">Ветер<br /> {Math.round(day.windspeed * 0.277778)} м/с</p>
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                : null : null
    )
}