import axios from "axios";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { selectCity } from "../redux/actions";
import Spinner from "./Spinner";

class SliderItem extends React.Component {
    constructor(props) {
        super(props);
        this.API_KEY = '17582dea4abae09f22389693d0af9aa6';
        this.url = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cityName}&lang=ru&units=metric&appid=${this.API_KEY}
    `;
        this.imgURL = `https://pixabay.com/api/?key=30005054-b01b9d0c1ed9ef5cf5bbc1624&q=${this.props.cityName}`;
        this.state = {
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(){
        !!this.state.data ? this.state.cityName === this.props.cityName ? console.log('') : this.getData()
        : console.log('');
    }
// номер текущей картинки в массиве
    imgNumber = 0; 

// запрашиваем данные и устанавливаем в состояние
    async getData(indexImg = 0) {
        if(indexImg > 6){
            alert('Может хватит?')
        }
        this.url = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cityName}&lang=ru&units=metric&appid=${this.API_KEY}
        `;
        this.imgURL = `https://pixabay.com/api/?key=30005054-b01b9d0c1ed9ef5cf5bbc1624&q=${this.props.cityName}&image_type=photo&max_width=800`;

        let response = await axios.get(this.url).catch(err => alert(err));

// Если нет картинки для данного города подставить шаблонную
        let imgURL = await axios.get(this.imgURL).then(res => res.data.hits[indexImg].largeImageURL)
        .catch(err => err.name == 'TypeError' ? 'https://i.ytimg.com/vi/Jn0yaaLFNvY/maxresdefault.jpg' : alert('img', err));
        
        this.setState({
            data: response.data,
            cityName: this.props.cityName,
            imgURL,
            isLoaded: true,
        })
    }

    render() {
        return (<div className={'slider__item'} id={this.props.id} data-cityname={this.state.cityName} style={{backgroundImage: `url(${this.state.imgURL})`}} onClick={(e) => this.props.selectCity(e.target.dataset.cityname)}>
            {!!this.state.isLoaded ?

                <React.Fragment>
                    <div className="slider__text">
                        <h2 className='slider__cityName'>
                            {this.state.data.name}
                        </h2>
                        <p className='slider__tempInfo'>
                            <p className='slider__temp'>
                                {this.state.data.main.temp > 0 ? '+' : this.state.data.main.temp < 0 ? '-' : ''}{Math.round(this.state.data.main.temp)}°
                            </p> 
                            <p className='slider__tempDescr'>
                                {this.state.data.weather[0].description}
                            </p>
                        </p>
                        
                        <p className='slider__wind'>
                            Ветер {Math.round(this.state.data.wind.speed)} м/с
                        </p>

                        <input type="button" value="Сменить картинку" onClick={() => this.getData(++this.imgNumber)} className="switch-button"/>

                    </div>
                </React.Fragment> : <Spinner />

            }

        </div>)
    }
}

function mapDispatchToProps(dispatch){
    return {
        selectCity: (city) => dispatch(selectCity(city))
    }
}

export default connect(null, mapDispatchToProps)(SliderItem)