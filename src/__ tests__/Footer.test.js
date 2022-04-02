import { render } from "@testing-library/react";
import Footer from "../components/Footer";

// smoke test
it('renders without crashing', function() {
  render(<Footer />);

});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});

it("should have author's name in the component.", function() {
  const { getByText } = render(<Footer />);
  expect(getByText("© Fabio Speroni 2022")).toBeInTheDocument();
});