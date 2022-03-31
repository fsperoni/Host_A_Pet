import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import HostAPetApi from './Api';
import MyBooking from './MyBooking';


const MyBookings = () => {
  const { currentUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(function getBookings() {
    const getBkngs = async () => {
      const userBookings = await HostAPetApi.getUserBookings(currentUser.username);
      console.log(userBookings);
      setBookings(userBookings);
    }
    getBkngs();
  }, [currentUser.username]);

  return (
    <div className="MyBookings mt-3">
      <div className="container">
        {bookings.map(booking =>(
          <MyBooking key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  )
}

export default MyBookings;