import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import HostAPetApi from './Api';
import AvailabilitySearchForm from './AvailabilitySearchForm';
import BookingCard from './BookingCard';

const Booking = () => {
  const { currentUser } = useContext(UserContext);
  const [avails, setAvails] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(function getRoles() {
    const getAllRoles = async () => {
      const allRoles = await HostAPetApi.getAllRoles();
      setRoles(allRoles);
    }
    getAllRoles();
  }, [currentUser.username]);

  const bookingCards = avails.map(a => (
    <BookingCard key={a.id} avail={a} />
  ));

  return (
    <div className="Booking container">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h4 className="text-center">New Booking</h4>
        <h4 className="text-center">Fill the form to start your search</h4>
        <AvailabilitySearchForm avails={avails} setAvails={setAvails} roles={roles} />
      </div>
      {avails.length ?
        <div className="container">{bookingCards}</div> :
        <h2 className="mt-4 text-center">Nothing to show yet!</h2>
      }
    </div>
  )
}

export default Booking;