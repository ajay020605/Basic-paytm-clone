import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signup";

import './App.css'
import './index.css'
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

function App() {
 

  return (
    <>
     <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/sendmoney" element={<SendMoney/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
