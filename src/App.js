
import './App.css';
import Login from "../src/pages/login/login"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import React, { useState } from "react";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route exact path="/dashboard" element={<Dashboard loggedin={isLoggedIn} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
