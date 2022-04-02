import { render } from "@testing-library/react";
import UserContext from "../hooks/useUserContext";
import Roles from "../components/Roles";

const {
  currentAdminUser
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Roles />
    </UserContext.Provider>
  );
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Roles />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Roles' in the component.", function () {
  const { getByText } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Roles />
    </UserContext.Provider>
  );
  expect(getByText("Roles")).toBeInTheDocument();
  expect(getByText("No roles added yet")).toBeInTheDocument();
});
