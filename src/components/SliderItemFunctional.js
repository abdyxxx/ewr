import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { showDetailInform, selectCity, getCityData, getBackImg } from "../redux/actions";
import Spinner from "./Spinner";

export default function SliderItem(props) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.cityName}&lang=ru&units=metric&appid=17582dea4abae09f22389693d0af9aa6`;
    const imgURL = `https://pixabay.com/api/?key=30005054-b01b9d0c1ed9ef5cf5bbc1624&q=${props.cityName}&image_type=photo&max_width=800`;

    const dispatch = useDispatch();
    const citiesData = useSelector(state => state.citiesData)
    const backImg = useSelector(state => state.backImg)

    useEffect(() => {
        dispatch(getCityData(url, props.cityName));
        dispatch(getBackImg(imgURL, props.cityName))
    }, [props.cityName])

    const handleClick = (e) => {
        dispatch(selectCity(e.target.dataset.cityname));
        dispatch(showDetailInform(true))
    }
    // 
    
    return (
        <div className={'slider__item'} id={props.id} data-cityname={props.cityName} style={{ backgroundImage: `url(${backImg[props.cityName]})` }} onClick={handleClick}>
            {citiesData[props.cityName] ?
                <React.Fragment>
                    <div className="slider__text">
                        <h2 className='slider__cityName'>
                            {citiesData[props.cityName].name}
                        </h2>
                        <div className='slider__tempInfo'>
                            <p className='slider__temp'>
                                {citiesData[props.cityName].main.temp > 0 ? '+' : citiesData[props.cityName].main.temp < 0 ? '-' : ''}{Math.round(citiesData[props.cityName].main.temp)}°
                            </p>
                            <p className='slider__tempDescr'>
                                {citiesData[props.cityName].weather[0].description}
                            </p>
                        </div>

                        <p className='slider__wind'>
                            Ветер {Math.round(citiesData[props.cityName].wind.speed)} м/с
                        </p>

                    </div>
                </React.Fragment> : <Spinner />
            }
        </div>
    )
}
