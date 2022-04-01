import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import HostAPetApi from './Api';
import MyBooking from './MyBooking';


const MyBookings = () => {
  const { currentUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(function getMyBookings() {
    const getBookings = async () => {
      const userBookings = await HostAPetApi.getUserBookings(currentUser.username);
      setBookings(userBookings);
    }
    getBookings();
}, [currentUser.username]);

useEffect(function getMyReviews() {
  const getReviews = async () => {
    const userReviews = await HostAPetApi.getUserReviews(currentUser.username);
    setReviews(userReviews);
    console.log("All", userReviews);
  }
  getReviews();
}, [currentUser.username]);

const bookingItems = bookings.map(booking => (
  <MyBooking key={booking.id} booking={booking} reviews={reviews} />
))

return (
  <div className="MyBookings mt-3">
    <div className="container">
      {bookingItems}
    </div>
  </div>
)
}

export default MyBookings;