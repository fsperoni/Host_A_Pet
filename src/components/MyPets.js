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

  const petCards = pets.map(pet => (
    <div key={pet.id} className="card">
      <div className="card-body">
        <p>{pet.name} the {pet.type}</p>
        <p>{pet.photo}</p>
      </div>
    </div>
  ))
  return (
    <div className="MyPets">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">My Pets</h2>
        {petCards}
      </div>
      <AddPetForm pets={pets} setPets={setPets}/>
    </div>
  )
}

export default MyPets;