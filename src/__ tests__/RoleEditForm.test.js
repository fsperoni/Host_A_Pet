import { render } from "@testing-library/react";
import RoleEditForm from "../components/RoleEditForm";

const {
  roles, roleForm, 
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
        <RoleEditForm role={roleForm()} setRoles={function () { }}
        setShoweditForm={function () {}} roles={roles()} />
  );
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
        <RoleEditForm role={roleForm()} setRoles={function () { }}
        setShoweditForm={function () {}} roles={roles()} />

  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Update role' in the component.", function () {
  const { getByText } = render(
        <RoleEditForm role={roleForm()} setRoles={function () { }}
        setShoweditForm={function () {}} roles={roles()} />
  );
  expect(getByText("Update role")).toBeInTheDocument();
});
