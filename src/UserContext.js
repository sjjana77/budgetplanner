import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [budget_details, setbudget_details] = useState(JSON.parse(localStorage.getItem('budget_details')) || {
    income: 0,
    savings:0,
    expenses:0
  });

  const updateBudgetDetails = (details) => {
    setbudget_details(details);
    localStorage.setItem('budget_details', JSON.stringify(details));
  };

  return (
    <UserContext.Provider value={{ budget_details, setbudget_details: updateBudgetDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };