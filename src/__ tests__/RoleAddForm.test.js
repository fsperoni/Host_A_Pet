import { render } from "@testing-library/react";
import UserContext from '../hooks/useUserContext';
import Roles from "../components/Roles";
import RoleAddForm from "../components/Role";

const {
  roles, roleForm, currentAdminUser,
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Roles setRoles={function () { }} role={roleForm()} roles={roles()}>
        <RoleAddForm setRoles={function () { }} roles={roles()} />
      </Roles >
    </UserContext.Provider>
  );
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Roles setRoles={function () { }} role={roleForm()} roles={roles()}>
        <RoleAddForm setRoles={function () { }} roles={roles()} />
      </Roles>
    </UserContext.Provider>

  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Add a Role' in the component.", function () {
  const { getByText } = render(
    <UserContext.Provider
      value={{ currentUser: currentAdminUser(), function() { } }}>
      <Roles setRoles={function () { }} role={roleForm()} roles={roles()}>
        <RoleAddForm setRoles={function () { }} roles={roles()} />
      </Roles>
    </UserContext.Provider>
  );
  expect(getByText("Add a Role")).toBeInTheDocument();
});
