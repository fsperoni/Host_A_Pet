import React from 'react';
import { BrowserRouter } from "react-router-dom";
import HostAPet from './components/HostAPet';
import '../src/styles/global.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HostAPet />
      </BrowserRouter>
    </div>
  );
}

export default App;
