
import './App.css';
import Login from "../src/pages/login/login"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';



function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
