import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDetail, showDetailInform } from "../redux/actions";
import Spinner from "./Spinner";

export default function DetailInform(props) {
    const [isLoading, setIsLoading] = useState(false);

    const cityName = useSelector(state => state.selectedCity);
    const showModale = useSelector(state => state.showDetail.showModale);
    const detailInform = useSelector(state => state.detailInform.detailInform);
    const dispatch = useDispatch();

    const getData = (city) => {
        setIsLoading(true)
        let dateStart = ((new Date(new Date().setDate(new Date().getDate() - 30)))).toISOString().slice(0, 10);
        let dateEnd = (new Date(new Date().setDate(new Date().getDate() - 1))).toISOString().slice(0, 10);

        dispatch(getDetail(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${dateStart}/${dateEnd}/?unitGroup=metric&include=current&key=MMNGBKJKHAGZV8FFRJ26AQ6HZ&contentType=json`))

        setIsLoading(false)
    }

    useEffect(() => {
        if (cityName.cityName) {
            getData(cityName.cityName)
        }
    }, [cityName])
    return (
        !!cityName.cityName ?
            detailInform ?
                showModale ?
                    <div className="modale_detailInform">
                        {isLoading ?
                            <Spinner /> :
                            <div className="modale_content">
                                <div className="detail-inform__header">Погода в городе {cityName.cityName} за последние 30 дней</div>
                                <div className="detail-inform">
                                    {detailInform.days.map((day, index) => (
                                        <div key={index} className='detail-inform__cell'>
                                            <p className="detail-inform__date">{day.datetime}</p>
                                            <p className="detail-inform__temp">Температура<br /> {day.temp}°C</p>
                                            <p className="detail-inform__wind">Ветер<br /> {Math.round(day.windspeed * 0.277778)} м/с</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="hide-btn" onClick={() => dispatch(showDetailInform(false))}>Скрыть</button>
                            </div>}
                    </div>
                    : null : null : null
    )
}