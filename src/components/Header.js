import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
import logoImg from '../assets/logo.png';
import '../styles/Header.scss';

const Header = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const signIn = () => {
    return(
      <>
      <NavLink end to="/login">
        Login
      </NavLink>
      <NavLink className="ms-3" end to="/signup">
        Sign Up
      </NavLink>
      </>
    )
  }

  const signOut = () => {
    return (
      <>
      <span className="me-3">Hello {currentUser.first_name || currentUser.username}!</span>
      <Link to="/" onClick={logout}>
        Log out
      </Link>
      </>
    )
  }

  return (
    <Navbar expand="sm" direction="horizontal">
      <NavLink end to="/" className="navbar-brand">
        <div className="d-flex">
          <img src={logoImg} alt="Host a Pet"/>
          <h1 className="my-auto">Host a Pet</h1>
        </div>
      </NavLink>
      <Nav navbar className="ms-5">
        <NavItem>
          <NavLink className="mr-2" end to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="mr-2" end to="/newBooking">New Booking</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="mr-2" end to="/myBookings">My Bookings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="mr-2" end to="/myPets">My Pets</NavLink>
        </NavItem>
        <NavItem>
          <NavLink end to="/myProfile">My Profile</NavLink>
        </NavItem>
      </Nav>
      <div className="login">
        {currentUser ? signOut() : signIn()}
      </div> 
    </Navbar>
  );
}

export default Header;