import { render } from "@testing-library/react";
import MyAvailability from "../components/MyAvailability";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  avail, avails, roles
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyAvailability setAvails={function() {}} avail={avail()} 
        avails={avails()} roles={roles()}/>
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyAvailability setAvails={function() {}} avail={avail()} 
        avails={avails()} roles={roles()}/>
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Delete' and 'Edit' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyAvailability setAvails={function() {}} avail={avail()} 
        avails={avails()} roles={roles()}/>
    </UserContext.Provider>
  );
  expect(getByText("Delete")).toBeInTheDocument();
  expect(getByText("Edit")).toBeInTheDocument();
});
