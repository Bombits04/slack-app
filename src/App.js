
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
import "semantic-ui-css/semantic.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route  path="/signup" Component={Signup} />
        <Route  path="/dashboard" element={<Dashboard loggedin={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
