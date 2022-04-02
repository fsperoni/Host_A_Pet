import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PetAddForm from "../components/PetAddForm";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  pets
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <PetAddForm setPets={function () { }} pets={pets()} />
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
        <PetAddForm setPets={function () { }} pets={pets()} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Add a Pet' in the component.", function () {
  const { getByText } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <PetAddForm setPets={function () { }} pets={pets()} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(getByText("Add a Pet")).toBeInTheDocument();
});
