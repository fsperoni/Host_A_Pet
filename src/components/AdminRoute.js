import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../hooks/useUserContext";

/** Ensuring access to logged in users only. */
const AdminRoute = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser.isAdmin ? <Outlet /> : <Navigate to="/login"/>
}

export default AdminRoute;