import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import './style.css';
import App from './App';
import apiFacade from "./components/apiFacade";

ReactDOM.render(<App apiFacade={apiFacade} />, document.getElementById('root'));
