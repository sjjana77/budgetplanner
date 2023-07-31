import React, { useContext } from 'react'
import { UserContext } from '../UserContext';

const Dashboard = () => {
  const { budget_details, setbudget_details } = useContext(UserContext);
  return (
    <div className="container">
      <div className='row mt-2'>
        <div className='col'>
        <h3 className='text-black'>DASHBOARD</h3>
        <h4 className='text-black'>{budget_details.income}</h4>
        </div>
        <div className='col'>
            <i className="fa fa-money source-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/budgetplanner/#/source"}></i>
            <i className="fa fa-bitcoin budget-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/budgetplanner/#/budget"}></i>
        </div>
        </div>
        <div className="row">
        <div className="col bg-success m-3 rounded w-100">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Income</p>
        </div>
        <div className="col bg-warning m-3 rounded w-100">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Savings</p>
        </div>
        <div className="col bg-danger m-3 rounded w-100">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Expenses</p>
        </div>
      </div>
      <div className="row">
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details.income} className="form-control p-2 heading-input" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details.savings} className="form-control p-2 heading-input" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details.expenses} className="form-control p-2 heading-input" readOnly />
        </div>
      </div>
      <br />

      <br />
    </div>
  );
};

export default Dashboard;
