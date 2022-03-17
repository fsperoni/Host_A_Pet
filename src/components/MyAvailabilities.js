import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../hooks/useUserContext';
import MyAvailability from './MyAvailability';
import AvailabilityAddForm from './AvailabilityAddForm'
import HostAPetApi from './Api';

const MyAvailabilities = () => {
  const { currentUser } = useContext(UserContext);
  const [avails, setAvails] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(function getAvailabilities() {
    const getAvails = async () => {
      const userAvails = await HostAPetApi.getUserAvailabilities(currentUser.username);
      setAvails(userAvails);
    }
    getAvails();
  }, [currentUser.username]);
  
  useEffect(function getRoles() {
    const getAllRoles = async () => {
      const allRoles = await HostAPetApi.getAllRoles();
      setRoles(allRoles);
    }
    getAllRoles();
  }, [currentUser.username]);


  const availRows = avails.map(a => (
    <MyAvailability key={a.id} avail={a} avails={avails} 
      setAvails={setAvails} roles={roles}/>
  ));

  const availTable = (
    <table className="table table-striped table-hover table-responsive text-center">
      <thead>
        <tr>
          <th>Role</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {avails.length ? availRows : null}
      </tbody>
    </table>
  );

  return (
    <div className="MyAvailabilities container">
      <h2 className="mb-3">My Availabilities</h2>
      {avails.length ? availTable : <h3 className="ms-2">No availabilities added yet</h3>}
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <AvailabilityAddForm avails={avails} setAvails={setAvails} roles={roles} />
      </div>
    </div>
  )
}

export default MyAvailabilities;