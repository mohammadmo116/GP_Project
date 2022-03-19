
import React from "react";
import Pagetop from "./components/Homepage/Pagetop";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Sign up/Signup";
import Page from "./components/ForgotPassword/Page"
import NewPass from "./components/ForgotPassword/NewPass";
import Home from "./components/Homepage/Home";
import Tournament from "./components/Tournament/Tournament";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";
function App()
{
  return( 
  <Router>
  <Pagetop />

    <Routes>
      <Route  path="/Login" element={<Login />} />
      <Route  path="/Signup"   element={<Signup></Signup>} />
      <Route  path="/Login/ForgotPassword"   element={<Page />} />
      <Route  path="/reset-password"   element={<NewPass />} />
      <Route path="/" element={<ProfileSettings></ProfileSettings>} />
      <Route path="/hello" element={<Tournament></Tournament>} />
    </Routes>
    

  </Router>
  );
}
export default App;
