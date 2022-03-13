import React, { useState } from "react";
import Alert from "./Alert";
import HostAPetApi from "./Api";

/** Edit Role form. */

const RoleEditForm = ({role, roles, setRoles, setShowEditForm}) => {
  const [formData, setFormData] = useState({
    name: role.name
  });
  const [formErrors, setFormErrors] = useState([]);
  

  /** Handle form submit */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const id = parseInt(evt.target.children[0].value);
    try {
      const result = await HostAPetApi.updateRole(id, formData)
      const newRoles = roles.filter(role => role.id !== id);
      setRoles([...newRoles, result.role])
      setFormErrors([]);
      setShowEditForm(false);
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Handle form field changes */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
    setFormErrors([]);
  }

  /** Handle form cancel button */
  const handleCancel = (evt) => {
    evt.preventDefault();
    setFormErrors([]);
    setShowEditForm(false);
  }

  return (
    <div className="RoleEditForm mt-3">
      <div className="container">
        <h2 className="mb-3">Update role</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input name="name" className="form-control" onChange={handleChange}
                  value={formData.name}
                />
              </div>
              {formErrors.length>0 && <Alert type="danger" messages={formErrors} />}
              <div className="container mt-4">
              <button 
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              > <data value={role.id} />
                Save
              </button>
              <button
                className="btn btn-warning btn-block ms-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleEditForm;