import { render } from "@testing-library/react";
import Booking from "../components/Booking";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Booking />
    </UserContext.Provider>
  );
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Booking />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'New Booking' in the component.", function () {
  const { getByText } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Booking />
    </UserContext.Provider>
  );
  expect(getByText("New Booking")).toBeInTheDocument();
});