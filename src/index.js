import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Root from './Root';
import './index.scss';
import 'react-notifications/lib/notifications.css';
ReactDOM.render(
  <Root>
   
    <App />
  </Root>,
  document.getElementById('root')
);
