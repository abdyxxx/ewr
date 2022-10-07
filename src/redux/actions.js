import axios from "axios"
import { useDispatch } from "react-redux"

export function setItem(city) {
    return {
        type: 'ADD_ITEM',
        data: city
    }
}

export function replaceItem(city) {
    return {
        type: 'REPLACE_ITEM',
        data: city
    }
}
export function addData(data) {
    return {
        type: 'ADD_DATA',
        data
    }
}
export function selectCity(city) {
    localStorage.setItem(`${sessionStorage.currentUser + '_city'}`, city)
    return {
        type: 'SELECT_CITY',
        data: city
    }
}
export function setAuth(value) {
    return {
        type: 'AUTH',
        data: value
    }
}
export function showDetailInform(value) {
    return {
        type: 'SHOW_DETAIL',
        data: value
    }
}

export function cityData(data, cityName) {
    return {
        type: 'CITY_DATA',
        data,
        cityName
    }
}
export function setLoading(value) {
    return {
        type: 'SET_LOADING',
        value
    }
}
export function imgURL(img, cityName) {
    return {
        type: 'BACK_IMG',
        img,
        cityName
    }
}
export function setCities(data) {
    return {
        type: 'CITIES_LIST',
        data
    }
}
export function detailWeather(data) {
    return {
        type: 'DETAIL_INFORM',
        data
    }
}

export const getCitiesList = (url) => (dispatch) => {
    axios.get(url)
        .then(res => dispatch(setCities(res.data)))
        .catch(err => {
            if (err.response.status == 400)
                alert('полная информация по городу не найдена')
        })
}
export const getDetail = (url) => (dispatch) => {
    axios.get(url)
        .then(res => dispatch(detailWeather(res.data)))
}
export const getCityData = (url, cityName) => (dispatch) => {
    axios.get(url)
        .then(response => dispatch(cityData(response.data, cityName)))
        .catch(err => alert(err.message))
}
export const getBackImg = (url, cityName) => (dispatch) => {
    axios.get(url)
        .then(response => dispatch(imgURL(response.data.hits[0].largeImageURL, cityName)))
        .catch(err => err.name == 'TypeError' ? dispatch(imgURL('https://i.ytimg.com/vi/Jn0yaaLFNvY/maxresdefault.jpg', cityName)) : console.log('img', err));
}
