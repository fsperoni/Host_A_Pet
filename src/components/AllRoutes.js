import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Home";
import NotFound from "./NotFound";
import LoginForm from "./LoginForm";

const AllRoutes = ({login, signup}) => {
  return (
  <Routes>
    <Route exact path="/" element={<Home />}/>
    <Route exact path="/login" element={<LoginForm login = {login}/>}/>
    {/* <Route exact path="/hosts">
      <Menu category="snacks" items={snacks} title="Snacks" />
    </Route>
    <Route exact path="pets">
      <AddItemForm addItem={addSnack} category="snacks" />
    </Route> */}
    <Route path="/*" element={<NotFound />} />
  </Routes>
  )
}

export default AllRoutes;