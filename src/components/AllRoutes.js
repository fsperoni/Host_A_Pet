import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Home";
import NotFound from "./NotFound";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import SignupForm from './SignupForm';

const AllRoutes = ({login, signup}) => {
  return (
  <Routes>
    <Route exact path="/" element={<Home />}/>
    <Route exact path="/login" element={<LoginForm login = {login}/>}/>
    <Route exact path="/signup" element={<SignupForm signup = {signup}/>}/>
    <Route exact path="/dashboard" element={<Dashboard />}/>
    <Route path="/*" element={<NotFound />} />
  </Routes>
  )
}

export default AllRoutes;