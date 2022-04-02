import { render } from "@testing-library/react";
import UserContext from '../hooks/useUserContext';
import MyBookings from "../components/MyBookings";

const {
  currentAdminUser,
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <MyBookings />
    </UserContext.Provider>);

});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <MyBookings />
    </UserContext.Provider>);
  expect(asFragment()).toMatchSnapshot();
});
