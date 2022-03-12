import React, { useContext, useEffect, useState } from 'react';
import UserContext from "./UserContext";
import AddPetForm from './AddPetForm';
import HostAPetApi from './Api';

const MyPets = () => {
  const { currentUser } = useContext(UserContext);
  const [pets, setPets] = useState([]);

  useEffect(function getPets() {
    const getUserPets = async() => {
      const userPets = await HostAPetApi.getPets(currentUser.username);
      setPets(userPets);
    }
    getUserPets();
  }, [currentUser.username]);

  const handleEditPet = async () => {

  }

  const handleDeletePet = async(evt) => {
    const id = parseInt(evt.target.children[0].value);
    await HostAPetApi.deletePet(currentUser.username, id);
    setPets(pets => pets.filter(pet => pet.id !== id));
  }

  const petCards = pets.map(pet => (
    <div key={pet.id} className="card mt-3">
      <div className="card-body">
        <h3>{pet.name} the {pet.type}</h3>
        <img src={pet.photo} className="mt-2 img-fluid" alt="pet"/>
        <div className="container mt-3">
          <button className="btn btn-sm btn-primary" onClick={handleEditPet}>
            <data value={pet.id} />
            Edit
          </button>
          <button className="btn btn-sm btn-danger ms-2" onClick={handleDeletePet}>
            <data value={pet.id} />
            Delete
          </button>
        </div>
      </div>
    </div>
  ))
  return (
    <div className="MyPets">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">My Pets</h2>
        {pets.length ? petCards : <h3 className="ms-2">No pets added yet</h3>}
      </div>
      <AddPetForm pets={pets} setPets={setPets}/>
    </div>
  )
}

export default MyPets;