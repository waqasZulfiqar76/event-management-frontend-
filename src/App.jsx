import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import PersistentDrawerLeft from "./Components/Sidebar";

function App() {
  return (
    <Router>
      <PersistentDrawerLeft />
    </Router>
  );
}

export default App;
