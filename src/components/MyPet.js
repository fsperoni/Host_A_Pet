import React, { useContext, useState } from "react";
import UserContext from "../hooks/useUserContext";
import HostAPetApi from "./Api";
import EditPetForm from "./EditPetForm";

const MyPet = ({ pet, pets, setPets }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleEditPet = () => {
    setShowEditForm(!showEditForm);
  }

  const handleDeletePet = async(evt) => {
    const id = parseInt(evt.target.children[0].value);
    await HostAPetApi.deletePet(currentUser.username, id);
    setPets(pets => pets.filter(pet => pet.id !== id));
  }

  return (
  <div key={pet.id} className="card mt-3">
      <div className="card-body">
        <h3>{pet.name} the {pet.type}</h3>
        <img src={pet.photo} className="mt-2 img-fluid" alt="pet"/>
        <div className="container mt-3">
          <button className="btn btn-sm btn-primary" onClick={handleEditPet}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger ms-2" onClick={handleDeletePet}>
            <data value={pet.id} />
            Delete
          </button>
          {showEditForm ? 
            <EditPetForm pet={pet} pets={pets} setPets={setPets} setShowEditForm={setShowEditForm}/> : 
          null}
        </div>
      </div>
    </div>
  )
}

export default MyPet;