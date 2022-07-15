import React, { useContext } from 'react';
import {
  Routes,
  Route,Navigate
} from "react-router-dom";
import './App.scss';
import { AuthContext } from './context/admin/authContext/AuthContext';
import Movie from './pages/admin/movie/Movie';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import NewUser from './pages/admin/newuser/NewUser';
import NewMovie from './pages/admin/newmovie/NewMovie';
import AdListList from './pages/admin/listList/AdListList';
import AdList from './pages/admin/adlist/AdList';
import SideBar from './components/admincpn/sidebar/SideBar';
import AdNav from './components/admincpn/adnav/AdNav';
import MovieList from './pages/admin/movieList/MovieList';
import NewList from './pages/admin/newlist/NewList';
import PrivateRoutes from './PrivateRouter';
import User from './pages/admin/user/User';
import UserList from './pages/admin/userlist/UserList';
import SearchPage from './pages/search/SearchPage';
import Profile from './pages/profile/Profile';

const Element:React.FC <{Elm:any}> = ({Elm}) => {
  return (
    <div className='adhome'>    
    <SideBar />
    <div className="homeContainer">
      <AdNav />
      <div className="homeContent">
        <Elm />
      </div>
    </div>
</div>
  )
}

const App: React.FC  = () => {
  const {state} = useContext(AuthContext)
  return (
    <Routes>
        <Route path="/" element={state.user ? <Home type="" /> : <Navigate to="/register" replace />} />
        <Route path="/login" element={state.user ?<Navigate to="/" replace />   : <Login /> } />
        <Route path="/register" element={state.user ? <Navigate to="/" replace /> : <Register /> } />
        <Route>
          
        </Route>
        {
          state.user && (
            <>
            <Route path="/movies" element={<Home type="movie"/>} />
            <Route path="/series" element={<Home type="series"/>} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<Profile />} />

            <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={ <Element Elm={MovieList} /> } />
            <Route path="/admin/lists" element={ <Element Elm={AdListList} /> } />
            <Route path="/admin/lists/:listId" element={ <Element Elm={AdList} /> } />
            <Route path="/admin/lists/newlist" element={ <Element Elm={NewList} /> } />
            <Route path="/admin/movie/:movieId" element={ <Element Elm={Movie} /> } />
            <Route path="/admin/movie/newmovie" element={ <Element Elm={NewMovie} /> } />
            <Route path="/admin/users" element={ <Element Elm={UserList} /> } />
            <Route path="/admin/users/newuser" element={ <Element Elm={NewUser} /> } />
            <Route path="/admin/users/:userId" element={ <Element Elm={User} /> } />
            </Route>
            </>
          )
        }
  </Routes>
  
 
 
  );
}

export default App;
