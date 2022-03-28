import React, { useContext } from 'react';
import UserContext from "../hooks/useUserContext";
import Alert from './Alert';
import HostAPetApi from './Api';
import "../styles/BookingCard.scss";

const BookingCard = ({ avail, dateRange, bookError, bookSuccess, 
  setBookError, setBookSuccess}) => {
  const { currentUser } = useContext(UserContext);

  const handleBooking = async (evt) => {
    evt.preventDefault();
    setBookError([]);
    setBookSuccess([]);
    const data = { ...avail, dateRange: dateRange }
    try {
      await HostAPetApi.addBooking(currentUser.username, data);
      setBookSuccess(["Booking successfully added!"])
    } catch (err) {
      setBookError(err);
    }
  }

  let bookingCard;

  if (avail.role === "Host") {
    bookingCard = (
      <div className="ms-3">
        <h2>{avail.user.username}</h2>
        <h4>{avail.user.firstName} is available on your selected dates</h4>
        <h4>Ratings: </h4>
      </div>
    )
  } else {
    const pets = avail.pets.map(pet => (
      <div key={pet.id} className="col-lg mt-3 mb-1">
        <h3>{pet.name} the {pet.type}</h3>
        <img src={pet.photo} className="mt-2 img-fluid" alt="pet" />
      </div>
    ))
    bookingCard = (
      <>
        <h2 className="text-center">{avail.user.username}</h2>
        <h4 className="text-center">{avail.user.firstName} needs a host. Can you help?</h4>
        <h4>Their pets:</h4>
        <div className="row">{pets}</div>
      </>
    )
  }
  return (

    <div className="BookingCard border border-secondary">
      {bookingCard}
      <div className="row justify-content-center my-3">
        <button className="col-2 btn btn-primary btn-block" onClick={handleBooking}>
          <data value={avail.id} />
          Book!
        </button>
      </div>
      <div className="alert-container">
        {bookError.length > 0 && <Alert type="danger" messages={bookError} />}
        {bookSuccess.length > 0 && <Alert type="success" messages={bookSuccess} />}
      </div>
    </div>
  )
}

export default BookingCard;