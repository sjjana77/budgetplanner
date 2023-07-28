import {BrowserRouter, Routes, Route,Link} from "react-router-dom"
import Dashboard from "./components/Dashboard";
import Sourceofincome from "./components/Sourceofincome";
import Budget from './components/Budget';
import { useState } from "react";
import { UserProvider } from './UserContext';

function App() {
  const [incomedetails,setincomedetails] = useState({
    income: '',
    savings:'',
    expenses:''
  });
  return (
    <div className="App">
       <BrowserRouter>
       <UserProvider>
       <Routes>
        <Route path ="/" element={<Dashboard />}/>
        <Route path ="/source" element={<Sourceofincome />}/>
        <Route path ="/budget" element={<Budget />}/>
        </Routes>
        </UserProvider>
       </BrowserRouter>
    </div>
  );
}

export default App;
