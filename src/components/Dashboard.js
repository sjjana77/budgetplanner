import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/source" className="fa fa-money source-link text-black dashboard-icon cursor-pointer" style={{marginTop: "3px"}}></Link>
            <Link to="/budget" className="fa fa-bitcoin budget-link text-black dashboard-icon cursor-pointer"></Link>
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
