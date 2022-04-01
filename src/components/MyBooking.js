import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import ReviewForm from './ReviewForm';

const MyBooking = ({ booking, reviews }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(function getReview() {
    const bookingReview = reviews.filter(review => (
      review.reviewer === currentUser.username &&
      review.reviewee === booking.user.username))
    setReview(bookingReview);
  }, [reviews]);

  const handleReview = () => {
    setShowReviewForm(!showReviewForm);
  }
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
        <button className="btn btn-primary" onClick={handleReview}>
          Review
        </button>
        {showReviewForm ?
          <ReviewForm review={review[0]} setReview={setReview} 
          setShowReviewForm={setShowReviewForm} reviewee={booking.user.username} /> :
          null
        }
      </div>
    </div>
  )
}

export default MyBooking;