import React from 'react';
import pets from '../assets/pets.jpeg';

const Home = () => {
  return (
    <div className="container mt-3">
      <h1 className="text-center">Host a Pet!</h1>
      <p className="text-center" >
        We connect pet owners and pet hosts for amazing experiences. Sign up today
        and either search for a pet to host or someone to host your pet. You can browse
        by distance from your postal code, or filter results by host and pet owner
        ratings.
      </p>
      <p>Review hostings, assigning a score, or go through previous hostings 
        feedback to help you choose the best host for your pet, or the best pet for you
        to host.
      </p>
      <img className="img-fluid rounded mx-auto d-block" src={pets} />
    </div>
  )
}

export default Home;