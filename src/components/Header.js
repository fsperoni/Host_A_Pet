import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
// import UserContext from "./UserContext";
import logoImg from '../assets/logo.png';
import '../styles/Header.scss';

const Header = () => {
  // const { currentUser } = useContext(UserContext);
  const logged = false;
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
          <a href="#">Logged</a> :
          <a href="#">Login stuff</a>
        }
      </div> 
    </Navbar>
  );
}

export default Header;