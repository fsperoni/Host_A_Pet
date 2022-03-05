import React from "react";
import oops from '../assets/oops.png'
import '../styles/NotFound.scss';

/**
 * A component to be rendered whenever the URL points to a non-existent route.
 */
const NotFound = () => {
  return (
    <div className="NotFound">
      <h2 className="text-center">Hmmm. I can't seem to find what you want.</h2>
      <img src={oops} alt="Not Found" />
    </div>
  )
};

export default NotFound;