import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import DestinationList from './components/DestinationList';
import DestinationFact from './components/DestinationFact';
import UserList from './components/UserList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
 
      <Header />
      <Counter />
      <DestinationList />
      <DestinationFact />
      <UserList/>
    </Provider>
  </React.StrictMode>
);

