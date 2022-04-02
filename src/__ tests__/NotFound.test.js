import { render } from "@testing-library/react";
import NotFound from "../components/NotFound";

// smoke test
it('renders without crashing', function() {
  render(<NotFound />);

});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<NotFound />);
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Hmmm. I can't seem to find what you want.' in the component.", function() {
  const { getByText } = render(<NotFound />);
  expect(getByText("Hmmm. I can't seem to find what you want.")).toBeInTheDocument();
});