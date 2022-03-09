import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserContext from "./UserContext";

/** Ensuring access to logged in users only. */
const PrivateRoute = ({ exact, path, children }) => {
  const { currentUser } = useContext(UserContext);

  // if (!currentUser) {
  //   return <Navigate to="/login"/>;
  // }

  // return (
  //     <Route exact={exact} path={path} element={children}/>
  // );
  return currentUser ? <Outlet /> : <Navigate to="/login"/>
}

export default PrivateRoute;