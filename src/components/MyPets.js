import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../hooks/useUserContext";
import PetAddForm from './PetAddForm';
import HostAPetApi from './Api';
import MyPet from './MyPet';

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
    <MyPet key={pet.id} pet={pet} pets={pets} setPets={setPets}/>
  ));

  return (
    <div className="MyPets">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">My Pets</h2>
        {pets.length ? petCards : <h3 className="ms-2">No pets added yet</h3>}
      </div>
      <PetAddForm pets={pets} setPets={setPets}/>
    </div>
  )
}

export default MyPets;