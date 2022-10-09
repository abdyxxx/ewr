import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    showModale: false,
    isAuth: !!sessionStorage.currentUser,
    sliderItems: ['Moscow', 'New York', 'Paris', 'London', 'Beijing'],
    citiesData: {},
    backImg: {}
}

const toolkitSlice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setItem(state, action){
            state.sliderItems = [...state.sliderItems, action.payload]
        }, 
        replaceItem(state, action){
            state.sliderItems = [...state.sliderItems.slice(0, 5), action.payload]
        },
        selectCity(state, action){
            state.selectedCity = action.payload
        },
        setAuth(state, action){
            console.log(action.payload)
            state.isAuth = action.payload
        },
        showDetailInform(state, action){
            state.showDetail = action.payload
        },
        cityData(state, action){
            state.citiesData[action.payload.cityName] = action.payload.data
        },
        imgURL(state, action){
            state.backImg[action.payload.cityName] = action.payload.img
        },
        setCities(state, action){
            state.citiesList = action.payload
        },
        detailWeather(state, action){
            state.detailInform = action.payload
        },
    }
})
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
        .then(response => dispatch(cityData({data: response.data, cityName})))
        .catch(err => alert(err.message))
}
export const getBackImg = (url, cityName) => (dispatch) => {
    axios.get(url)
        .then(response => dispatch(imgURL({img: response.data.hits[0].largeImageURL, cityName})))
        .catch(err => err.name == 'TypeError' ? dispatch(imgURL({img: 'https://i.ytimg.com/vi/Jn0yaaLFNvY/maxresdefault.jpg', cityName})) : console.log('img', err));
}
export const { setItem, replaceItem, selectCity, setAuth, showDetailInform, cityData, imgURL, setCities, detailWeather } = toolkitSlice.actions
export default toolkitSlice