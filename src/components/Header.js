import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
// import UserContext from "./UserContext";
import logoImg from '../assets/logo.png';
import '../styles/Header.scss';

const Header = () => {
  // const { currentUser } = useContext(UserContext);
  return (
    <>
    {/* <header className="headerContainer"> */}
      <Navbar expand="md">
        <NavLink end to="/" className="navbar-brand">
          <div>
            <img src={logoImg} alt="Host a Pet"/>
            <h1>Host a Pet</h1>
          </div>
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="mr-2" end to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="mr-2" end to="/loxa">Home</NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink className="mr-2" to="/hosts">Find a Host</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="mr-2" to="/pets">Host a Pet</NavLink>
          </NavItem> */}
        </Nav>
      </Navbar>
      {/* <div className="headerContent">
        <a href="/"><img src={logoImg} alt="Host a Pet"/></a>
        <h1>Host a Pet</h1>
        <nav className="navBar"></nav>
      </div>
      <div className="headerLogin">
        <p>Login stuff</p>
      </div> */}
    {/* </header> */}
  </>
  );
}

export default Header;