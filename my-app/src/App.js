import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import Welcome from "./Welcome";
import SignUp from "./SignUp"; // import SignUp component

function App() {
  const [registered, setRegistered] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn registered={registered} setRegistered={setRegistered} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} /> // add new Route for SignUp component
      </Routes>
    </Router>
  );
}

export default App;
