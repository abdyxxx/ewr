import React, { useState, useRef, useEffect } from 'react';
// import SliderItem from './SliderItem'
import SliderItemFunctional from './SliderItemFunctional'
import { useSelector } from 'react-redux';

export default function Slider() {
    const [prevSlide, setPrevSlide] = useState(null);
    const [screenCoefficient, setScreenCoefficient] = useState(coefficient());

    function coefficient(){
        if(window.innerWidth < 769) return 1.3
        else return 2
    }

    let sliderItems = useSelector(state => state.sliderItems.items);


    const setActiveSlide = (item) => {
        if(prevSlide){
            prevSlide.className = 'slider__dot';
        }
        sliderRollRef.current.style.left = item.getAttribute('index') * -100 + '%';
        item.className = 'slider__dot active-dot';
        setPrevSlide(item)
    }

    const changeSlide = (e) => {
        setActiveSlide(e.target)
    }

    useEffect(() => {
        setActiveSlide(firstDotRef.current);
    }, [])

    useEffect(() => {
        sliderRef.current.style.height = sliderRef.current.clientWidth / screenCoefficient + 'px';
        sliderRollRef.current.style.minWidth = sliderItems.length * 100 + '%';
        if(sliderItems.length == 6){
            sliderRollRef.current.style.gridTemplateColumns = 'repeat(6, 1fr)';
            setActiveSlide(lastDotRef.current)
        }
    }, [sliderItems])

    window.onresize = () => {
        if(screenCoefficient !== coefficient()){
            setScreenCoefficient(coefficient())
        }
        sliderRef.current.style.height = sliderRef.current.clientWidth / screenCoefficient + 'px';
        sliderRollRef.current.style.width = sliderItems.length * 100 + '%';
    }
    const sliderRef = useRef(null);
    const sliderRollRef = useRef(null);
    const lastDotRef = useRef(null);
    const firstDotRef = useRef(null);

    return (
        <div className='slider' ref={sliderRef}>
            <div className="slider__roll" ref={sliderRollRef}>
                {sliderItems.map((res, index) => (
                    <SliderItemFunctional key={index} cityName={res} id={index}/>
                ))
                }
            </div>
            <div className='slider__pag'>
                {
                    sliderItems.map((res, index) => (
                        <span key={index} className='slider__dot' index={index} onClick={changeSlide} ref={index == 5 ? lastDotRef : index == 0 ? firstDotRef : null}></span>
                    ))
                }
            </div>
        </div>
    )
}