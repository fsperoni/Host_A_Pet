import React, { useContext, useState } from "react";
import UserContext from "../hooks/useUserContext";
import HostAPetApi from "./Api";
import AvailabilityEditForm from "./AvailabilityEditForm";

const MyAvailability = ({ avail, avails, setAvails, roles }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleEditAvail = () => {
    setShowEditForm(!showEditForm);
  }

  const handleDeleteAvail = async (evt) => {
    const id = parseInt(evt.target.children[0].value);
    await HostAPetApi.deleteAvailability(currentUser.username, id);
    setAvails(avails => avails.filter(avail => avail.id !== id));
  }
  const role = roles.find(role => role.id === avail.roleId);
  

  return (
    <tr key={avail.id} >
      <td>{role.name}</td>
      <td>{avail.startDate.substring(0,10)}</td>
      <td>{avail.endDate.substring(0,10)}</td>
      <td>
        <div className="container">
          <button className="btn btn-sm btn-primary" onClick={handleEditAvail}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger ms-2" onClick={handleDeleteAvail}>
            <data value={avail.id} />
            Delete
          </button>
          {showEditForm ?
            <AvailabilityEditForm avail={avail} avails={avails} setAvails={setAvails}
              setShowEditForm={setShowEditForm} roles={roles} /> :
            null}
        </div>
      </td>
    </tr>
  )
}

export default MyAvailability;