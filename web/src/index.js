import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './/../node_modules/toastr/build/toastr.css';

import {App} from './components/app';
import './styles.scss';

const appContainer = document.getElementById('app');

ReactDOM.render(
    <BrowserRouter basename="/fb">
        <App />
    </BrowserRouter>, appContainer);