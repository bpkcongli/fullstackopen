import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import anecdoteStore from './stores/store';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={anecdoteStore}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
