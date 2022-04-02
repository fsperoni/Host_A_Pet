import { render } from "@testing-library/react";
import HostAPet from "../components/HostAPet";

// smoke test
it('renders without crashing', function() {
  render(<HostAPet />);

});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<HostAPet />);
  expect(asFragment()).toMatchSnapshot();
});
