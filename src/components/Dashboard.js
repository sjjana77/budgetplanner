import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import PieChartSource from './PieChartSource';
import PieChartExpenses from './PieChartExpenses';
import PieChartSavings from './PieChartSavings';
import icon_source from '../icons/sourceincome.png';
import icon_budget from '../icons/budget.png';

const Dashboard = () => {
  const { budget_details, setbudget_details } = useContext(UserContext);
  return (
    <div className="container">
      <div className='row mt-2'>
        <div className='col'>
        <h3 className='text-black'>DASHBOARD</h3>
        </div>
        <div className='col'>
        <Link to="/source" className="source-link text-black dashboard-icon cursor-pointer" >
        <img src={icon_source} height={25} width={30} alt="My Image" />
        </Link>
        <Link to="/budget" className="budget-link text-black dashboard-icon cursor-pointer">
        <img src={icon_budget} height={25} width={30} alt="My Image" />
        </Link>
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
      {JSON.parse(localStorage.getItem("selectedsource")) !== null ?
      JSON.parse(localStorage.getItem("selectedsource")).length !== 0 ?
      <div className="Piechartt">
      <div className='card-text heading-text p-2 d-flex justify-content-center'> 
      <PieChartSource data={JSON.parse(localStorage.getItem("selectedsource"))} />
      </div>
      <div className="text-black card-text p-2 d-flex justify-content-center">Source of Income</div>
    </div>
    :
    <></>
    :
    <></>
      }

      {JSON.parse(localStorage.getItem("budget")) !== null ?
      JSON.parse(localStorage.getItem("budget")).filter(prev=>prev.type==="S").length!==0 ?
            <div className="Piechartt">
            <div className='card-text heading-text p-2 d-flex justify-content-center'> 
            <PieChartSavings data={JSON.parse(localStorage.getItem("budget")).filter(prev=>prev.type==="S")} />
            </div>
            <div className="text-black card-text p-2 d-flex justify-content-center">Monthly Savings</div>
          </div>
          :
          <></>
          :
          <></>
      }
      {JSON.parse(localStorage.getItem("budget")) !== null ?
      JSON.parse(localStorage.getItem("budget")).filter(prev=>prev.type!=="S").length !==0 ?
            <div className="Piechartt">
            <div className='card-text heading-text p-2 d-flex justify-content-center'> 
            <PieChartExpenses data={JSON.parse(localStorage.getItem("budget")).filter(prev=>prev.type!=="S")} />
            </div>
            <div className="text-black card-text p-2 d-flex justify-content-center">Monthly Expenses</div>
          </div>
          :
          <></>
          :
          <></>
      }

      <br />
    </div>
  );
};

export default Dashboard;
