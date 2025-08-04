import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ✅ CSS loaded here

import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
