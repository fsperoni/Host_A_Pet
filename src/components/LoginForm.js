import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

/** Login form. */
const LoginForm = ({ login }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      history("/dashboard");
    } else {
      setFormErrors(result.errors);
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(form => ({ ...form, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input className="form-control" autoComplete="username" required
                  value={formData.username} onChange={handleChange} name="username"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" name="password" required
                  value={formData.password} onChange={handleChange} autoComplete="current-password"/>
              </div>

              {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

              <button className="btn btn-primary float-right" onSubmit={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
