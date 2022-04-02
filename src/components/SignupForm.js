import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

/** Signup form. */

const SignupForm = ({ signup }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      history("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input name="username" className="form-control" onChange={handleChange}
                  value={formData.username}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" className="form-control"
                  value={formData.password} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>First name:</label>
                <input name="firstName" className="form-control" onChange={handleChange}
                  value={formData.firstName}
                />
              </div>
              <div className="form-group">
                <label>Last name:</label>
                <input name="lastName" className="form-control" onChange={handleChange}
                  value={formData.lastName}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input name="phone" className="form-control" onChange={handleChange}
                  value={formData.phone} type="tel"
                />
              </div>
              <div className="form-group">
                <label>Postal code:</label>
                <input name="postalCode" className="form-control" onChange={handleChange}
                  value={formData.postalCode}
                />
              </div>
              {formErrors.length>0 && <Alert type="danger" messages={formErrors} />}
              <button type="submit" className="btn btn-primary mt-2 float-right"
                onSubmit={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;