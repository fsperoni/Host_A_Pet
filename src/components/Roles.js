import React, { useContext, useState, useEffect } from "react";
import UserContext from "../hooks/useUserContext";
import HostAPetApi from "./Api";
import Role from "./Role";
import RoleAddForm from "./RoleAddForm";

const Roles = () => {
  const { currentUser } = useContext(UserContext);
  const [roles, setRoles] = useState([]);

  useEffect(function getRoles() {
    const getAppRoles = async() => {
      const appRoles = await HostAPetApi.getAllRoles();
      setRoles(appRoles);
    }
    getAppRoles();
  }, [currentUser.username]);

  const roleCards = roles.map(role => (
    <Role key={role.id} role={role} roles={roles} setRoles={setRoles}/>
  ));

  return (
    <div className="Roles">
      <div className="container">
        <h2 className="mb-3">Roles</h2>
        {roles.length ? roleCards : <h3 className="ms-2">No roles added yet</h3>}
      </div>
      <RoleAddForm roles={roles} setRoles={setRoles} />
    </div>
  );
}

export default Roles;