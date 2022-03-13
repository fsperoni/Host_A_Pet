import React, { useState, useContext } from "react";
import Alert from "./Alert";
import HostAPetApi from "./Api";
import { TYPE } from "./HostAPet";
import UserContext from "../hooks/useUserContext";

/** Edit Pet form. */

const PetEditForm = ({pet, pets, setPets, setShowEditForm}) => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    ownerId: pet.ownerId,
    name: pet.name,
    type: pet.type,
    photo: pet.photo,
  });
  const [formErrors, setFormErrors] = useState([]);
  

  /** Handle form submit */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const id = parseInt(evt.target.children[0].value);
    try {
      const result = await HostAPetApi.updatePet(currentUser.username, id, formData)
      const newPets = pets.filter(pet => pet.id !== id);
      setPets([...newPets, result.pet])
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
    return TYPE.filter(t => t !== formData.type).map(animal => (
      <option key={animal} value={animal}>{animal}</option>
    ))
  }
  const options = generateOptions();
  return (
    <div className="EditPetForm mt-3">
      <div className="container">
        <h2 className="mb-3">Update pet info</h2>
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
                  <option value={formData.type}>{formData.type}</option>
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
              > <data value={pet.id} />
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

export default PetEditForm;