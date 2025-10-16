import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { pageview } from './gtag';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Send initial pageview to Google Analytics (single-page routing tracking
// should be handled inside your router by calling pageview on location changes)
try {
  pageview(window.location.pathname + window.location.search);
} catch (e) {
  // ignore if analytics is not loaded
}
