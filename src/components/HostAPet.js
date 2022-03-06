import React, { useState, useEffect } from "react";
import Header from "./Header";

import AllRoutes from "./AllRoutes";

/**
 * Main app component that holds all the states, AJAX calls and renders 
 * the different routes as applicable.
 */
const HostAPet = () => {

  return (
    <>
    <Header />
    <main>
      <AllRoutes />
      
    </main>
    </>
  );
}

export default HostAPet;