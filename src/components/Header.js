import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
// import UserContext from "./UserContext";
import logoImg from '../assets/logo.png';
import '../styles/Header.scss';

const Header = ({ logout }) => {
  // const { currentUser } = useContext(UserContext);
  const logged = true;

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
      <Link to="/" onClick={logout}>
        Logout
        {/* Log out {currentUser.first_name || currentUser.username} */}
      </Link>
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
          <NavLink className="mr-2" end to="/loxa">Home</NavLink>
        </NavItem>
      </Nav>
      <div className="login">
        {logged ? 
          signOut() :
          signIn()          
        }
      </div> 
    </Navbar>
  );
}

export default Header;