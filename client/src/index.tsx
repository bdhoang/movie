import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './context/admin/authContext/AuthContext';
import { MovieContextProvider } from './context/admin/movieContext/MovieContext';
import { ListContextProvider } from './context/admin/listContext/ListContext';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthContextProvider>
    <MovieContextProvider>
      <ListContextProvider>
    <App />
    </ListContextProvider>
    </MovieContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
