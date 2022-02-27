/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Navbar from '../Navbar/Navbar';
import People from '../People/People';
import Register from '../Register/Register';
import TvShow from '../Tv shows/TvShow';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MovieDetails from './../MovieDetails/MovieDetails';
import { MediaContextProvider } from '../MediaContext';
import Networks from './../Networks/Networks';
import TvDetails from '../TvDetails/TvDetails';
import PeopleDetails from '../PeopleDetails/PeopleDetails';
export default function 
() {
  const[userData, setUserData]= useState(null);
  let navigate= useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    {
      getUserData();
    }

  }, []);
  function getUserData()
  {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'));
    setUserData(decodedToken);
  }
  function logOut()
  {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('./login');
  }
  function ProtectedRoute({children})
  {
    if(!localStorage.getItem('userToken'))
    {
     return <Navigate to='/login'/>
    }
    else
    {
      return children;
    }
  }
  return (
    <>
      <Navbar userData={userData} logOut={logOut}/>
     <div className="container">
       <MediaContextProvider>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
        <Route path='movieDetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
          <Route path=':id' element={<MovieDetails/>}/>
        </Route>
        <Route path='tvshows' element={<ProtectedRoute><TvShow/></ProtectedRoute>}/>
        <Route path='tvDetails' element={<ProtectedRoute><TvDetails/></ProtectedRoute>}>
          <Route path=':id' element={<TvDetails/>}/>
        </Route>
        <Route path='people' element={<ProtectedRoute> <People/></ProtectedRoute>}/>
        <Route path='peopleDetails' element={<ProtectedRoute><PeopleDetails/></ProtectedRoute>}>
          <Route path=':id' element={<PeopleDetails/>}/>
        </Route>
        <Route path='networks' element={<ProtectedRoute> <Networks/></ProtectedRoute>}/>
        <Route path='login' element={<Login getUserData={getUserData}/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </MediaContextProvider>
     </div>
    </>
  )
}
