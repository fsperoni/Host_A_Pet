import { render } from "@testing-library/react";
import Role from "../components/Role";

const {
  roleForm, roles
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
        <Role setRoles={function () { }} role={roleForm()} roles={roles()} />
  );
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
        <Role setRoles={function () { }} role={roleForm()} roles={roles()} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Edit' and 'Delete' in the component.", function () {
  const { getByText } = render(
        <Role setRoles={function () { }} role={roleForm()} roles={roles()} />
  );
  expect(getByText("Delete")).toBeInTheDocument();
  expect(getByText("Edit")).toBeInTheDocument();
});
