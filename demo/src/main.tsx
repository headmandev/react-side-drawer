import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Library styles (relative path for demo; in your app use 'react-side-panel/dist/styles.css')
import '../../src/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
