import React, { useContext, useState } from "react";
import HostAPetApi from "./Api";
import RoleEditForm from "./RoleEditForm";

const Role = ({ role, roles, setRoles }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditRole = () => {
    setShowEditForm(!showEditForm);
  }

  const handleDeleteRole = async(evt) => {
    const id = parseInt(evt.target.children[0].value);
    await HostAPetApi.deleteRole(id);
    setRoles(roles => roles.filter(role => role.id !== id));
  }

  return (
  <div key={role.id} className="card mt-3">
      <div className="card-body">
        <h3>{role.name}</h3>
        <div className="container mt-3">
          <button className="btn btn-sm btn-primary" onClick={handleEditRole}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger ms-2" onClick={handleDeleteRole}>
            <data value={role.id} />
            Delete
          </button>
          {showEditForm ? 
            <RoleEditForm role={role} roles={roles} setRoles={setRoles} setShowEditForm={setShowEditForm}/> : 
          null}
        </div>
      </div>
    </div>
  )
}

export default Role;