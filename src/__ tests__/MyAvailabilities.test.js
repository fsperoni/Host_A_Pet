import { render } from "@testing-library/react";
import UserContext from '../hooks/useUserContext';
import MyAvailabilities from "../components/MyAvailabilities";

const {
  currentAdminUser,
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <MyAvailabilities />
    </UserContext.Provider>);

});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <MyAvailabilities />
    </UserContext.Provider>);
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'My Availabilities' in the component.", function () {
  const { getByText } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <MyAvailabilities />
    </UserContext.Provider>);
  expect(getByText("My Availabilities")).toBeInTheDocument();
  expect(getByText("No availabilities added yet")).toBeInTheDocument();
});