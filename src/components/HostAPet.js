import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import Header from "./Header";
import AllRoutes from "./AllRoutes";
import useLocalStorage from "./useLocalStorage";
import HostAPetApi from "./Api";
import UserContext from "./UserContext";
import Footer from "./Footer";

export const TOKEN_ID = "HostAPet-token";

/**
 * Main app component that holds all the states, AJAX calls and renders 
 * the different routes as applicable.
 */
const HostAPet = () => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_ID);

  useEffect(function loadUserInfo() {

    const getCurrentUser = async() => {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          HostAPetApi.token = token;
          const currentUser = await HostAPetApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }
  const signup = async(signupData) => {
    try {
      const token = await HostAPetApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  const login = async(loginData) => {
    try {
      const token = await HostAPetApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }
  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser, setCurrentUser }}>
        <main className="flex-shrink-0">
        <Header logout={logout} />
          <AllRoutes logout={logout} login={login} signup={signup} />
        </main>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default HostAPet;