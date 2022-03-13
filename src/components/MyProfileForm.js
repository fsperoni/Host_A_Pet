import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import HostAPetApi from "./Api";
import UserContext from "../hooks/useUserContext";

/** User Profile edit form. */
const MyProfileForm = ({ logout }) => {
  const history = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username, 
    firstName: currentUser.firstName,
    lastName: currentUser.lastName, 
    email: currentUser.email,
    phone: currentUser.phone,
    postalCode: currentUser.postalCode,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      postalCode: formData.postalCode,
      password: formData.password
    };

    const username = formData.username;
    let updatedUser;

    try {
      updatedUser = await HostAPetApi.updateUser(username, userData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setIsSaved(true);

    setCurrentUser(updatedUser);
  }

  /** Handle form field changes */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(form => ({ ...form, [name]: value }));
    setFormErrors([]);
  }
  /** Handle form cancel button */
  const handleCancel = (evt) => {
    evt.preventDefault();
    history("/");
  }

  /** Handle form delete button */
  const handleDelete = async (evt) => {
    evt.preventDefault();
    const username = formData.username;
    let res;
    try {
      res = await HostAPetApi.deleteUser(username);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    history("/");
    logout();
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username:</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Postal code:</label>
              <input
                name="postalCode"
                className="form-control"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            {isSaved
              ?
              <Alert type="success" messages={["Updated successfully."]} />
              : null}
            <div className="container mt-4">
              <button
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
              <button
                className="btn btn-warning btn-block ms-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger btn-block ms-4"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfileForm;
