import { render } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <Header logout={function () { }} />
      </UserContext.Provider>
    </BrowserRouter>);
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <Header logout={function () { }} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Host a Pet' in the component.", function () {
  const { getByText } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <Header logout={function () { }} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(getByText("Host a Pet")).toBeInTheDocument();
});
