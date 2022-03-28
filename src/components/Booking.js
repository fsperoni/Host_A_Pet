import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import HostAPetApi from './Api';
import AvailabilitySearchForm from './AvailabilitySearchForm';
import BookingCard from './BookingCard';
import '../styles/Booking.scss'
import Alert from './Alert';

const Booking = () => {
  const { currentUser } = useContext(UserContext);
  const [avails, setAvails] = useState([]);
  const [roles, setRoles] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [bookError, setBookError] = useState([]);
  const [bookSuccess, setBookSuccess] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(function getRoles() {
    const getAllRoles = async () => {
      const allRoles = await HostAPetApi.getAllRoles();
      setRoles(allRoles);
    }
    getAllRoles();
  }, [currentUser.username]);

  const bookingCards = avails.map(a => (
    <BookingCard key={a.id} avail={a} dateRange={dateRange} bookError={bookError} 
    setBookError={setBookError} bookSuccess={bookSuccess} setBookSuccess={setBookSuccess}/>
  ));

  return (
    <>
    <div className="Booking col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h2 className="text-center">New Booking</h2>
      <AvailabilitySearchForm setDateRange={setDateRange} setAvails={setAvails} 
        bookError={bookError} setBookError={setBookError} setNotFound={setNotFound}
        bookSuccess={bookSuccess} setBookSuccess={setBookSuccess} roles={roles} />
    </div>
    <div className="container col-md-6 mb-3">
      {notFound && <Alert type="danger" messages={["No results found!"]} />}
      {avails.length ? 
        <>
        <div className="Booking-filter">
          <h4>Max distance (km):</h4>
          <select className="ms-2" name="distance">
            <option value="">Select one</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">15</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button className="btn btn-primary btn-block ms-3">
            Go
          </button>
        </div>
        <div className="d-grid mt-4">{bookingCards}</div>
        </> :
        <h2 className="mt-4 text-center">Nothing to show yet!</h2>
      }
    </div>
    </>
  )
}

export default Booking;