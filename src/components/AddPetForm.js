import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import HostAPetApi from "./Api";

/** Add Pet form. */

const AddPetForm = ({ addPet }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    photo: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      history("/myProfile");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Handle form field changes */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
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
      console.log(res);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    history("/");
    setCurrentUser(null);
  }
  // TODO - ADD DROPDOWN FOR TYPE, LINKING BACK TO GLOBAL VARIABLE PETS.
  return (
    <div className="AddPetForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input name="name" className="form-control" onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="form-group">
                <label>Type:</label>
                <input name="type" className="form-control"
                  value={formData.type} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Photo:</label>
                <input name="photo" type="url" className="form-control" onChange={handleChange}
                  value={formData.photo}
                />
              </div>
              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
              }
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
    </div>
  );
}

export default AddPetForm;