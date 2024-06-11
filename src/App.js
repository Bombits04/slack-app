import './App.css';
import Login from "../src/pages/login/login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import React, { useState } from "react";
import Signup from "../src/pages/signup/signup";
import Error404 from "../src/pages/Error404/Error404";
import Welcome from "../src/pages/Welcome/Welcome";
import LoaderPage from './pages/LoaderPage/LoaderPage';
import LandingPage from './pages/LandingPage/LandingPage';
import "semantic-ui-css/semantic.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route index path="/" Component={LandingPage}/> 
        <Route  path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route  path="/signup" Component={Signup} />
        <Route  path="/dashboard" element={<Dashboard loggedin={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route  path="/welcome" Component={Welcome} />
        <Route  path="/redirect" Component={LoaderPage} />
        {/* <Route  path="/hello" Component={LandingPage} /> */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
