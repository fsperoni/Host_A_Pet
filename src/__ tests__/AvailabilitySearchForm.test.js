import { render } from "@testing-library/react";
import AvailabilitySearchForm from "../components/AvailabilitySearchForm";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  roles,
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilitySearchForm setDateRange={function() {}} setAvails={function() {}}
        setBookSuccess={function() {}} setNotFound={function() {}} roles={roles()} setBookError={function() {}}/>
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilitySearchForm setDateRange={function() {}} setAvails={function() {}}
        setBookSuccess={function() {}} setNotFound={function() {}} roles={roles()} setBookError={function() {}}/>
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Start your search!' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AvailabilitySearchForm setDateRange={function() {}} setAvails={function() {}}
        setBookSuccess={function() {}} setNotFound={function() {}} roles={roles()} setBookError={function() {}}/>
    </UserContext.Provider>
  );
  expect(getByText("Start your search!")).toBeInTheDocument();
});