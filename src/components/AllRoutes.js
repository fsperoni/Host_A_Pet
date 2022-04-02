import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Home";
import NotFound from "./NotFound";
import LoginForm from "./LoginForm";
import SignupForm from './SignupForm';
import MyProfileForm from './MyProfileForm';
import PrivateRoute from './PrivateRoute';
import MyPets from './MyPets';
import AdminPanel from './AdminPanel';
import AdminRoute from './AdminRoute';
import MyAvailabilities from './MyAvailabilities';
import Booking from './Booking';
import MyBookings from './MyBookings';

const AllRoutes = ({logout, login, signup}) => {
  return (
  <Routes>
    <Route exact path="/" element={<Home />}/>
    <Route exact path="/login" element={<LoginForm login = {login}/>}/>
    <Route exact path="/signup" element={<SignupForm signup = {signup}/>}/>
    <Route exact path="/myProfile" element={<PrivateRoute />}>
      <Route exact path="/myProfile" element={<MyProfileForm logout = {logout}/>}/>
    </Route>
    <Route exact path="/myPets" element={<PrivateRoute />}>
      <Route exact path="/myPets" element={<MyPets />}/>
    </Route>
    <Route exact path="/myAvailabilities" element={<PrivateRoute />}>
      <Route exact path="/myAvailabilities" element={<MyAvailabilities />}/>
    </Route>
    <Route exact path="/newBooking" element={<PrivateRoute />}>
      <Route exact path="/newBooking" element={<Booking />}/>
    </Route>
    <Route exact path="/myBookings" element={<PrivateRoute />}>
      <Route exact path="/myBookings" element={<MyBookings />}/>
    </Route>
    <Route exact path="/admin" element={<AdminRoute />}>
      <Route exact path="/admin" element={<AdminPanel />}/>
    </Route>
    <Route path="/*" element={<NotFound />} />
  </Routes>
  )
}

export default AllRoutes;