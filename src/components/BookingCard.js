import React from 'react';

const BookingCard = ({ avail }) => {
  console.log("Card", avail);
  let bookingCard;

  if (avail.role === "Host") {
    bookingCard = (
      <>
        <h2>{avail.user.username}</h2>
        <h4>{avail.user.firstName} is available on your selected dates</h4>
        <h4>Ratings: </h4>
      </>
    )
  } else {
    const pets = avail.pets.map(pet => (
      <div key={pet.id} className="col-lg mt-3 mx-3 mb-1 border border-secondary">
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
    </div>
  )
}

export default BookingCard;