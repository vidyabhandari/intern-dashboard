import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";

function App() {
  return(
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000}/>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/form" element={<UserForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
