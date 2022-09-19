import React, { Component } from 'react';
import Content from './Content';
import Header from './Header';
import './styles/Main.css'

export default function Main(props) {
    return (
        <React.Fragment>
            <Header />
            <Content />
        </React.Fragment>
    )
}