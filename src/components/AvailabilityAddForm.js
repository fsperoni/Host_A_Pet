import React, { useState, useContext } from "react";
import Alert from "./Alert";
import HostAPetApi from "./Api";
import UserContext from "../hooks/useUserContext";

/** Add Availability form. */

const AvailabilityAddForm = ({ avails, setAvails, roles}) => {
  const min = new Date().toISOString().substring(0,10);
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    startDate: min,
    endDate: min,
    roleId: ""
  });
  const [formErrors, setFormErrors] = useState([]);
  

  /** Handle form submit */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const result = await HostAPetApi.addAvailability(currentUser.username, formData);
      setAvails([...avails, result]);
      setFormData({
        startDate: min,
        endDate: min,
        roleId: ""
      });
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
      startDate: min,
      endDate: min,
      roleId: ""
    });
    setFormErrors([]);
  }

  const generateOptions = () => {
    return roles.map(role => (
      <option key={role.id} value={role.id}>{role.name}</option>
    ))
  }
  const options = generateOptions();
  return (
    <div className="AvailabilityAddForm mt-3">
      <div className="container">
        <h2 className="mb-3">Add availability</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Start date:</label>
                <input name="startDate" className="form-control" onChange={handleChange}
                  value={formData.startDate} type="date" min={min} required
                />
              </div>
              <div className="form-group">
                <label>End date:</label>
                <input name="endDate" className="form-control" onChange={handleChange}
                  value={formData.endDate} type="date" min={min} required
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select name="roleId" className="form-select" onChange={handleChange}
                  value={formData.roleId} required > 
                <option value="">Select one</option>
                  {options}
                </select>
              </div>
              {formErrors.length>0 && <Alert type="danger" messages={formErrors} />}
              <div className="container mt-4">
              <button 
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              > 
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

export default AvailabilityAddForm;