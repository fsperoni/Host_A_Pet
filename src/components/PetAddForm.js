import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import HostAPetApi from "./Api";
import { TYPE } from "./HostAPet";
import UserContext from "../hooks/useUserContext";

/** Add Pet form. */

const PetAddForm = ({pets, setPets}) => {
  const { currentUser } = useContext(UserContext);
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    photo: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  /** Handle form submit */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const result = await HostAPetApi.addPet(currentUser.username, formData);
      setPets([...pets, result.pet])
      setFormData({
        name: "",
        type: "Select one",
        photo: "",
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
    history("/");
  }

  const generateOptions = () => {
    return TYPE.map(animal => (
      <option key={animal} value={animal}>{animal}</option>
    ))
  }
  const options = generateOptions();
  return (
    <div className="AddPetForm mt-3 mb-3">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Add a Pet</h2>
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
                <select name="type" className="form-select" onChange={handleChange}>
                  <option hidden="" value="">Select one</option>
                  {options}
                </select>
              </div>
              <div className="form-group">
                <label>Photo:</label>
                <input name="photo" type="url" className="form-control" onChange={handleChange}
                  value={formData.photo}
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

export default PetAddForm;