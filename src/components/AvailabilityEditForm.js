import React, { useState, useContext } from "react";
import Alert from "./Alert";
import HostAPetApi from "./Api";
import UserContext from "../hooks/useUserContext";

/** Edit Availability form. */

const AvailabilityEditForm = ({avail, avails, setAvails, setShowEditForm, roles}) => {
  const min = new Date().toISOString().substring(0,10);
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    startDate: avail.startDate.substring(0,10),
    endDate: avail.endDate.substring(0,10),
    roleId: avail.roleId
  });
  const [formErrors, setFormErrors] = useState([]);
  

  /** Handle form submit */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const id = parseInt(evt.target.children[0].value);
    try {
      const result = await HostAPetApi.updateAvailability(currentUser.username, id, formData)
      const newAvails = avails.filter(avail => avail.id !== id);
      setAvails([...newAvails, result])
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

  const generateOptions = () => {
    return roles.filter(r => r.id !== formData.roleId).map(role => (
      <option key={role.id} value={role.id}>{role.name}</option>
    ))
  }
  const options = generateOptions();
  const role = roles.find(role => role.id === avail.roleId);
  return (
    <div className="AvailabilityEditForm mt-3">
      <div className="container">
        <h2 className="mb-3">Update availability</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Start date:</label>
                <input name="startDate" className="form-control" onChange={handleChange}
                  value={formData.startDate} type="date" min={min}
                />
              </div>
              <div className="form-group">
                <label>End date:</label>
                <input name="endDate" className="form-control" onChange={handleChange}
                  value={formData.endDate} type="date" min={min}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select name="roleId" className="form-select" onChange={handleChange}>
                  <option value={role.id}>{role.name}</option>
                  {options}
                </select>
              </div>
              {formErrors.length>0 && <Alert type="danger" messages={formErrors} />}
              <div className="container mt-4">
              <button 
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              > <data value={avail.id} />
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

export default AvailabilityEditForm;