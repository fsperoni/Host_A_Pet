import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import Alert from "./Alert";
import HostAPetApi from './Api';

const ReviewForm = ({ review, reviewee, setReview, setShowReviewForm }) => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    id: 0,
    reviewer: currentUser.username,
    reviewee: reviewee,
    rating: "",
    comments: ""
  });
  const [formErrors, setFormErrors] = useState([]);
  const [reviewSuccess, setReviewSuccess] = useState([]);

  useEffect(function setForm() {
    if (review) {
      setFormData({
        id: review.id,
        reviewer: review.reviewer,
        reviewee: review.reviewee,
        rating: review.rating, 
        comments: review.comments
      })
    }
  }, []);

  /** Handle form submit */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let data = { ...formData };
    try {
      let result;
      if (data.id === 0) {
        delete data.id;
        result = await HostAPetApi.addReview(currentUser.username, data);
        setReview(result);

      } else {
        const id = data.id;
        delete data.id;
        result = await HostAPetApi.updateReview(currentUser.username, id, data);
        setReview(result)
      }
      setFormData({
        id: result.id,
        reviewer: result.reviewer,
        reviewee: result.reviewee,
        rating: result.rating,
        comments: result.comments
      });
      setReviewSuccess(["Review successfully processed!"]);
      setFormErrors([]);
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Handle form field changes */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
    setFormErrors([]);
  }

  /** Handle form cancel button */
  const handleCancel = (evt) => {
    evt.preventDefault();
    setShowReviewForm(false);
  }

  return (
    <div className="ReviewForm mt-3">
      <div className="container">
        <h2 className="mb-3">Your review</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Rating:</label>
                <select name="rating" required className="form-select"
                  onChange={handleChange} value={formData.rating}>
                  <option hidden="" required value="">Select one</option>
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                  <option value={0}>0</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comments:</label>
                <textarea name="comments" className="form-control" onChange={handleChange}
                  value={formData.comments}
                />
              </div>
              {formErrors.length > 0 && <Alert type="danger" messages={formErrors} />}
              <div className="container mt-4">
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="btn btn-warning btn-block ms-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <div className="alert-container">
                  {reviewSuccess.length > 0 && <Alert type="success" messages={reviewSuccess} />}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;