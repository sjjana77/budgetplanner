import React, { useContext } from 'react'
import { UserContext } from '../UserContext';

const Dashboard = () => {
  const { budget_details, setbudget_details } = useContext(UserContext);
  return (
    <div className="container">
      <div className='row mt-2'>
        <div className='col'>
        <h3 className='text-black'>DASHBOARD</h3>
        </div>
        <div className='col'>
            <i className="fa fa-money source-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/source"}></i>
            <i className="fa fa-bitcoin budget-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/budget"}></i>
        </div>
        </div>
      <div className="row">
        <div className="col bg-success m-3 rounded">
          <p className="card-text p-2 d-flex justify-content-center">Total Income</p>
        </div>
        <div className="col bg-warning m-3 rounded">
          <p className="card-text p-2 d-flex justify-content-center">Savings</p>
        </div>
        <div className="col bg-danger m-3 rounded">
          <p className="card-text p-2 d-flex justify-content-center">Expenses</p>
        </div>
      </div>
      <div className="row">
        <div className="col rounded">
          <input id="total_income" value={budget_details.income} className="form-control p-2" readOnly/>
        </div>
        <div className="col rounded">
          <input id="total_income" value={budget_details.savings} className="form-control p-2" readOnly/>
        </div>
        <div className="col rounded">
          <input id="total_income" value={budget_details.expenses} className="form-control p-2" readOnly/>
        </div>
      </div>
      <div className="row">
        <div className="col bg-primary m-1">
          <p className="card-text p-2 d-flex justify-content-center fs-7">Income Target</p>
        </div>
        <div className="col bg-primary m-1">
          <p className="card-text p-2 d-flex justify-content-center fs-7">Savings Target</p>
        </div>
        <div className="col bg-primary m-1">
          <p className="card-text p-2 d-flex justify-content-center fs-7">Expenses Target</p>
        </div>
      </div>
      <div className="row">
        <div className="col rounded">
          <input id="total_income" value="" placeholder="Target amount" className="form-control p-2" />
        </div>
        <div className="col rounded">
          <input id="total_income" value="" placeholder="Target amount" className="form-control p-2" />
        </div>
        <div className="col rounded">
          <input id="total_income" value="" placeholder="Target amount" className="form-control p-2" />
        </div>
      </div>
      <div className="row">
        <div className="col rounded">
          <input id="total_income" value="" placeholder="Actual" className="form-control p-2" />
        </div>
        <div className="col rounded">
          <input id="total_income" value="" placeholder="Actual" className="form-control p-2" />
        </div>
        <div className="col rounded">
          <input id="total_income" value="" placeholder="Actual" className="form-control p-2" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
