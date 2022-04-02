import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../components/LoginForm";

// smoke test
it('renders without crashing', function () {
  render(
    <BrowserRouter>
      <LoginForm login={function () { }} />
    </BrowserRouter>);
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <LoginForm login={function () { }} />
    </BrowserRouter>);
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Username' and 'Password' in the component.", function () {
  const { getByText } = render(
    <BrowserRouter>
      <LoginForm login={function () { }} />
    </BrowserRouter>);
  expect(getByText("Username")).toBeInTheDocument();
  expect(getByText("Password")).toBeInTheDocument();
});