import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "../components/SignupForm";

// smoke test
it('renders without crashing', function () {
  render(
    <BrowserRouter>
      <SignupForm signup={function () { }} />
    </BrowserRouter>);
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <SignupForm signup={function () { }} />
    </BrowserRouter>);
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Sign Up' in the component.", function () {
  const { getByText } = render(
    <BrowserRouter>
      <SignupForm signup={function () { }} />
    </BrowserRouter>);
  expect(getByText("Sign Up")).toBeInTheDocument();
});