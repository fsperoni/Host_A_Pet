import { render } from "@testing-library/react";
import AvailabilityEditForm from "../components/AvailabilityEditForm";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  avails, roles, avail
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilityEditForm avail={avail()} avails={avails()} 
        setAvails={function() {}} setShowEditForm={function() {}} roles={roles()}/>
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilityEditForm avail={avail()} avails={avails()} 
        setAvails={function() {}} setShowEditForm={function() {}} roles={roles()}/>
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Update availability' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilityEditForm avail={avail()} avails={avails()} 
        setAvails={function() {}} setShowEditForm={function() {}} roles={roles()}/>
    </UserContext.Provider>
  );
  expect(getByText("Update availability")).toBeInTheDocument();
});