import React from 'react';
import { render } from "@testing-library/react";
import Alert from '../components/Alert';

const messages = ["Hello!"]
// smoke test
it('renders without crashing', function() {
  render(<Alert type="danger" messages={messages} />);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Alert type="danger" messages={messages}/>);
  expect(asFragment()).toMatchSnapshot();
});
