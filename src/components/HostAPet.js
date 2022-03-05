import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

/**
 * Main app component that holds all the states, AJAX calls and renders 
 * the different routes as applicable.
 */
const HostAPet = () => {

  // if (!drinks && !snacks) {
  //   return <p>Loading &hellip;</p>;
  // }

  return (
    <>
    <Header />
    <main>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        {/* <Route exact path="/hosts">
          <Menu category="snacks" items={snacks} title="Snacks" />
        </Route>
        <Route exact path="pets">
          <AddItemForm addItem={addSnack} category="snacks" />
        </Route> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
    </>
  );
}

export default HostAPet;