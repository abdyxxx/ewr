import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setItem, replaceItem, selectCity, getCitiesList } from '../redux/actions';

export default function SearchCity() {
    const [filtredData, setFiltredData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [inputActive, setInputActive] = useState(true);

    const dispatch = useDispatch();
    const sliderItems = useSelector(state => state.sliderItems.items)
    const citiesList = useSelector(state => state.citiesList.citiesList)

    let handleInput = (e) => {
        setInputValue(e.target.value);
        setInputActive(true)
        if(citiesList) setFiltredData(citiesList.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }
    function handleHints(e) {
        setSelectedCity(e.target.innerHTML);
        setInputActive(false);
        dispatch(selectCity(selectedCity))
    }
    useEffect(() => {
        if (localStorage[`${sessionStorage.currentUser + '_city'}`]) setSelectedCity(localStorage[`${sessionStorage.currentUser + '_city'}`])
    }, [])

    useEffect(() => {
        if (selectedCity) {
            // Засетить новый город в слайдер
            if (sliderItems.length == 5) {
                dispatch(setItem(selectedCity));
                dispatch(selectCity(selectedCity));
            // Заменить имеющийся город в слайдере
            }else if(sliderItems.length == 6){
                dispatch(replaceItem(selectedCity));
                dispatch(selectCity(selectedCity));
            }
        }
    }, [selectedCity])

    useEffect(() => {
        dispatch(getCitiesList('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'))
    }, [])
    return (
        <div className='search'>
            <p className='search__text'>Узнайте погоду в своем городе (English)</p> 
            <input onChange={handleInput} value={inputValue} className='search__input'>

            </input>
            <ul className={'search__hint'} style={{ display: !!inputValue && inputActive ? 'block' : 'none' }}>
                {filtredData.slice(0, 5).map((res, index) => (<li key={index} onClick={handleHints}>{res.name}</li>))}
            </ul>
        </div>
    )
}