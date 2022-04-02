import { render } from "@testing-library/react";
import AvailabilityAddForm from "../components/AvailabilityAddForm";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  avails, roles
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilityAddForm avails={avails()} setAvails={function() {}} roles={roles()}/>
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilityAddForm avails={avails()} setAvails={function() {}} roles={roles()}/>
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Add availability' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilityAddForm avails={avails()} setAvails={function() {}} roles={roles()}/>
    </UserContext.Provider>
  );
  expect(getByText("Add availability")).toBeInTheDocument();
});