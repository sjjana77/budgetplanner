import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sourceofincome from "./components/Sourceofincome";
import Budget from './components/Budget';
import Settings from './components/Settings';
import { useState } from "react";
import { UserProvider } from './UserContext';

function App() {
  function convertToMonthYear(date) {
    const [year, month] = date.split('-');
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return months[parseInt(month) - 1] + ' ' + year;
  }
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Dashboard convertToMonthYear={convertToMonthYear} />} /> 
            <Route path="/source" element={<Sourceofincome convertToMonthYear={convertToMonthYear} />} />
            <Route path="/budget" element={<Budget convertToMonthYear={convertToMonthYear} />} />
            <Route path="/settings" element={<Settings convertToMonthYear={convertToMonthYear} />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
