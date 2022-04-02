import { render } from "@testing-library/react";
import UserContext from '../hooks/useUserContext';
import MyPets from "../components/MyPets";
import { BrowserRouter } from "react-router-dom";

const {
  currentAdminUser,
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <MyPets />
      </UserContext.Provider>
    </BrowserRouter>
  );

});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <MyPets />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'No pets added yet' in the component.", function () {
  const { getByText } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <MyPets />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(getByText("No pets added yet")).toBeInTheDocument();
  expect(getByText("My Pets")).toBeInTheDocument();
});
