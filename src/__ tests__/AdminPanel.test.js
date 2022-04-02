import { render } from "@testing-library/react";
import AdminPanel from "../components/AdminPanel";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser
} = require("./_testCommon");

// smoke test
it('renders without crashing', function() {
  render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AdminPanel />
    </UserContext.Provider>);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AdminPanel />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Admin Panel' in the component.", function() {
  const { getByText } = render(
    <UserContext.Provider
          value={{ currentUser: currentAdminUser() , function() {}}}>
      <AdminPanel />
    </UserContext.Provider>
  );
  expect(getByText("Admin Panel")).toBeInTheDocument();
});