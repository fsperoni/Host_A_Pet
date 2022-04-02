import { render } from "@testing-library/react";
import MyPet from "../components/MyPet";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  pet, pets
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyPet pet={pet()} pets={pets()}/>
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyPet pet={pet()} pets={pets()}/>
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Garfield1 the Dog' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <MyPet pet={pet()} pets={pets()}/>
    </UserContext.Provider>
  );
  expect(getByText("Garfield1 the Dog")).toBeInTheDocument();
});
