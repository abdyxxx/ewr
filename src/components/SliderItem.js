import axios from "axios";
import React from 'react';
import { connect } from "react-redux";
import { detailInform, selectCity, cityData, imgURL } from "../redux/actions";
import Spinner from "./Spinner";

class SliderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate() {
        !!this.state.data ? this.state.cityName == this.props.cityName ? console.log('') : this.getData()
            : console.log('');
    }
    // номер текущей картинки в массиве
    imgNumber = 0;

    // запрашиваем данные и устанавливаем в состояние
    async getData(indexImg = 0) {
        this.url = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cityName}&lang=ru&units=metric&appid=17582dea4abae09f22389693d0af9aa6`;
        this.imgURL = `https://pixabay.com/api/?key=30005054-b01b9d0c1ed9ef5cf5bbc1624&q=${this.props.cityName}&image_type=photo&max_width=800`;

        this.props.cityDataThunk(this.url, this.props.cityName);
        this.props.backImgThunk(this.imgURL, this.props.cityName);

        // Если нет картинки для данного города подставить шаблонную
        let imgURL = await axios.get(this.imgURL).then(res => res.data.hits[indexImg].largeImageURL)
            .catch(err => err.name == 'TypeError' ? 'https://i.ytimg.com/vi/Jn0yaaLFNvY/maxresdefault.jpg' : alert('img', err));

        this.setState({
            cityName: this.props.cityName,
            isLoaded: true,
        })
    }

    handleClick = (e) => {
        this.props.selectCity(e.target.dataset.cityname)
        this.props.showDetail(true)
    }
    render() {
        return (<div className={'slider__item'} id={this.props.id} data-cityname={this.props.cityName} style={{ backgroundImage: `url(${this.props.backImg[this.props.cityName]})` }} onClick={this.handleClick}>
            {!!this.state.isLoaded ?

                <React.Fragment>
                    <div className="slider__text">
                        <h2 className='slider__cityName'>
                            {this.props.citiesData[this.props.cityName].name}
                        </h2>
                        <p className='slider__tempInfo'>
                            <p className='slider__temp'>
                                {this.props.citiesData[this.props.cityName].main.temp > 0 ? '+' : this.props.citiesData[this.props.cityName].main.temp < 0 ? '-' : ''}{Math.round(this.props.citiesData[this.props.cityName].main.temp)}°
                            </p>
                            <p className='slider__tempDescr'>
                                {this.props.citiesData[this.props.cityName].weather[0].description}
                            </p>
                        </p>

                        <p className='slider__wind'>
                            Ветер {Math.round(this.props.citiesData[this.props.cityName].wind.speed)} м/с
                        </p>

                    </div>
                </React.Fragment> : <Spinner />

            }

        </div>)
    }
}

const getCityData = (url, cityName) => (dispatch) => {
    axios.get(url)
        .then(response => dispatch(cityData(response.data, cityName)))
        .catch(err => console.log(err.message))
}
const getBackImg = (url, cityName) => (dispatch) => {
    axios.get(url)
        .then(response => dispatch(imgURL(response.data.hits[0].largeImageURL, cityName)))
        .catch(err => err.name == 'TypeError' ? 'https://i.ytimg.com/vi/Jn0yaaLFNvY/maxresdefault.jpg' : alert('img', err));
}

function mapDispatchToProps(dispatch) {
    return {
        selectCity: (city) => dispatch(selectCity(city)),
        showDetail: (value) => dispatch(detailInform(value)),
        cityDataThunk: (url, cityName) => dispatch(getCityData(url, cityName)),
        backImgThunk: (url, cityName) => dispatch(getBackImg(url, cityName))
    }
}
function mapStateToProps(state) {
    return {
        citiesData: state.citiesData,
        backImg: state.backImg,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderItem)