import { render } from "@testing-library/react";
import MyBooking from "../components/MyBooking";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  reviews, booking
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyBooking reviews={reviews()} booking={booking()} 
        />
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyBooking reviews={reviews()} booking={booking()} 
        />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Booking Details:' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyBooking reviews={reviews()} booking={booking()} 
        />
    </UserContext.Provider>
  );
  expect(getByText("Booking Details:")).toBeInTheDocument();
});
