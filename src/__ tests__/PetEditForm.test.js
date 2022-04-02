import { render } from "@testing-library/react";
import PetEditForm from "../components/PetEditForm";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  pets, pet
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <PetEditForm setPets={function () { }} pets={pets()} 
          pet={pet()} setShowEditForm={function () {}}/>
      </UserContext.Provider>
  );
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <PetEditForm setPets={function () { }} pets={pets()} 
          pet={pet()} />
      </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Update pet info' in the component.", function () {
  const { getByText } = render(
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <PetEditForm setPets={function () { }} pets={pets()} 
          pet={pet()} />
      </UserContext.Provider>
  );
  expect(getByText("Update pet info")).toBeInTheDocument();
});
