import { render } from "@testing-library/react";
import BookingCard from "../components/BookingCard";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  bookingAvail, dateRange
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <BookingCard setBookError={function() {}} bookError={true} bookSuccess={false}
        setBookSuccess={function() {}} avail={bookingAvail()} dateRange={dateRange()}/>
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <BookingCard setBookError={function() {}} bookError={true} bookSuccess={false}
        setBookSuccess={function() {}} avail={bookingAvail()} dateRange={dateRange()}/>
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Book!' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <BookingCard setBookError={function() {}} bookError={true} bookSuccess={false}
        setBookSuccess={function() {}} avail={bookingAvail()} dateRange={dateRange()}/>
    </UserContext.Provider>
  );
  expect(getByText("Book!")).toBeInTheDocument();
});
