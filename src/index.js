import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Search from './containers/Search';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Search />, document.getElementById('root'));
if (process.env.NODE_ENV === 'production')
    registerServiceWorker();
