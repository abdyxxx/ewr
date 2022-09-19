import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setItem, replaceItem, selectCity } from '../redux/actions';

export default function SearchCity() {
    const [data, setData] = useState([]);
    const [filtredData, setFiltredData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [inputActive, setInputActive] = useState(true);

    const dispatch = useDispatch();
    const sliderItems = useSelector(state => state.sliderItems.items)

    let handleInput = (e) => {
        setInputValue(e.target.value);
        setInputActive(true)
        setFiltredData(data.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    async function getResponse() {
        let response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
            .then((res) => res.data)
        setData(response);
    }

    function handleHints(e) {
        setSelectedCity(e.target.innerHTML);
        setInputActive(false);
        dispatch(selectCity(selectedCity))
    }

    useEffect(() => {
        if (selectedCity) {
            // Засетить новый город в слайдер
            if (sliderItems.length == 5) {
                dispatch(setItem(selectedCity));
                dispatch(selectCity(selectedCity));
                console.log(selectedCity)
            // Заменить имеющийся город в слайдере
            }else if(sliderItems.length == 6){
                dispatch(replaceItem(selectedCity));
                dispatch(selectCity(selectedCity));
                console.log(selectedCity)
            }
        }
    }, [selectedCity])

    useEffect(() => {
        getResponse();
    }, [])
    return (
        <div className='search'>
            <p className='search__text'>Узнайте погоду в своем городе</p> 
            <input onChange={handleInput} value={inputValue} className='search__input'>

            </input>
            <ul className={'search__hint'} style={{ display: !!inputValue && inputActive ? 'block' : 'none' }}>
                {filtredData.slice(0, 5).map((res, index) => (<li key={index} onClick={handleHints}>{res.name}</li>))}
            </ul>
        </div>
    )
}