import React, { useState } from "react";
import Alert from "./Alert";
import HostAPetApi from "./Api";

/** Add Role form. */

const RoleAddForm = ({roles, setRoles}) => {
  const [formData, setFormData] = useState({
    name: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  /** Handle form submit */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const result = await HostAPetApi.addRole(formData);
      setRoles([...roles, result.role])
      setFormData({
        name: ""
      })
      setFormErrors([]);
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
    setFormData({
      name: ""
    });
    setFormErrors([]);
  }

  return (
    <div className="RoleAddForm mt-3 mb-3">
      <div className="container">
        <h2 className="mb-3">Add a Role</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input name="name" className="form-control" onChange={handleChange}
                  value={formData.name} required
                />
              </div>
              {formErrors.length>0 && <Alert type="danger" messages={formErrors} />}
              <div className="container mt-4">
              <button
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Add
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

export default RoleAddForm;