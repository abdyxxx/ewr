import React, { Component, useEffect, useState } from 'react';
import Slider from './Slider';
import SearchCity from './SearchCity';
import { useSelector } from 'react-redux';
import DetailInform from './DetailInform';

export default function Content() {
    let items = useSelector((state) => state.sliderItems.items);
    
    return (
        <div className='mainWrapper'>
            <Slider />
            <DetailInform />
            <SearchCity />
        </div>
    )
}