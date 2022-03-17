import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import HostAPetApi from './Api';

const BookingCard = ({ avail }) => {
  console.log("Card",avail);
  return (

    <div className="BookingCard container">
      <div>
        <h4 className="text-center">Max distance (km):</h4>
        <select name="distance" className="form-select">
          <option value="">Select one</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">15</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <button className="btn btn-primary btn-block">Go</button>
      </div>
    </div>
  )
}

      export default BookingCard;