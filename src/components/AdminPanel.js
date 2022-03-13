import React from "react";
import Roles from "./Roles";

const AdminPanel = () => {

  return (
    <div className="AdminPanel">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Admin Panel</h2>
        <Roles />
      </div>
    </div>
  );
}

export default AdminPanel;