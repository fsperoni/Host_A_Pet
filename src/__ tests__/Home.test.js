import { render } from "@testing-library/react";
import Home from "../components/Home";

// smoke test
it('renders without crashing', function() {
  render(<Home />);

});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Host a Pet!' in the component.", function() {
  const { getByText } = render(<Home />);
  expect(getByText("Host a Pet!")).toBeInTheDocument();
});