import React from 'react';

const MyBooking = ({ booking }) => {

  return (
    <div className="card mb-3">
      <div className="card-header">
        {booking.role1}
      </div>
      <div className="card-body">
        <h5 className="card-title">Booking Details:</h5>
        <p>Dates: {booking.startDate} - {booking.endDate}</p>
        <p>{booking.role2}: {booking.user.username}</p>
        <p>User Ratings: {booking.user.rating}</p>
      </div>
    </div>
  )
}

export default MyBooking;