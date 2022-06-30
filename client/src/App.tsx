import React from 'react';
import {
  Routes,
  Route,Navigate
} from "react-router-dom";
import './App.scss';
import { userInputs } from './formSource';
import AddNew from './pages/admin/addnew/AddNew';
import AdHome from './pages/admin/adhome/AdHome';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';

const App: React.FC  = () => {
  const user: boolean = true
  return (
    <Routes>
        <Route path="/" element={user ? <Home type=""/> : <Navigate to="/register" replace />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace /> } />
        <Route path="/admin" element={  <AdHome />} />
        <Route path="/admin/new" element={  <AddNew inputs = {userInputs} title ="Add New User..."/>} />
        {
          user && (
            <>
            <Route path="/movies" element={<Home type="movie"/>} />
            <Route path="/tvshows" element={<Home type="tvshow"/>} />
            <Route path="/watch" element={<Watch />} />
            </>
          )
        }
  </Routes>
  
 
 
  );
}

export default App;
