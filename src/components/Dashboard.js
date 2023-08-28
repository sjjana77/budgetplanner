import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import PieChartSource from './PieChartSource';
import PieChartExpenses from './PieChartExpenses';
import PieChartSavings from './PieChartSavings';
import icon_source from '../icons/sourceincome.png';
import icon_budget from '../icons/budget.png';

const Dashboard = () => {
  const { budget_details, setbudget_details } = useContext(UserContext);


  useEffect(()=>{
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth; 

    if(localStorage.getItem("budget_details")===null || localStorage.getItem("budget_details")===""){
      setbudget_details({selectedmonth: currentYear+'-'+formattedMonth,fontsize:'16px',fontcolor:'black',source_options:['Salary', 'Rent', 'Shares', 'FD', 'RD'],budget_options:[{type: 'E', category:'Credit Card'}, {type: 'E', category:'School Fees'},
      {type: 'E', category:'Medicines'},
      {type: 'S', category:'Post Office'},
      {type: 'S', category:'RD'},
      {type: 'E', category:'EB'}
      ],[currentYear+'-'+formattedMonth]:{month: currentYear+'-'+formattedMonth,income:0,savings:0,expenses:0,selectedsource:[],budget:[]}}); 
    }
    else{
      if(JSON.parse(localStorage.getItem("budget_details")).selectedmonth !== null && JSON.parse(localStorage.getItem("budget_details")).selectedmonth !== ""){
        // setbudget_details(JSON.parse(localStorage.getItem("budget_details"))[JSON.parse(localStorage.getItem("budget_details")).selectedmonth]);
      }
      else{
        setbudget_details({selectedmonth: currentYear+'-'+formattedMonth,fontsize:'16px',fontcolor:'black',source_options:['Salary', 'Rent', 'Shares', 'FD', 'RD'],budget_options:[{type: 'E', category:'Credit Card'}, {type: 'E', category:'School Fees'},
        {type: 'E', category:'Medicines'},
        {type: 'S', category:'Post Office'},
        {type: 'S', category:'RD'},
        {type: 'E', category:'EB'}
        ],[currentYear+'-'+formattedMonth]:{month: currentYear+'-'+formattedMonth,income:0,savings:0,expenses:0,selectedsource:[],budget:[]}}); 
      }
    }
  },[]);
  const changemonth = (e) =>{
    let tmp = {...budget_details};
    tmp[e.target.value] === undefined ?   setbudget_details({...budget_details,[e.target.value]:{month: e.target.value,income:0,savings:0,expenses:0,selectedsource:[],budget:[]},selectedmonth: e.target.value})
    :
    setbudget_details({...budget_details,selectedmonth: e.target.value});
  }
  if(budget_details.fontsize === undefined){
    budget_details.fontsize = "16";
  }
  if(budget_details.fontcolor === undefined){
    budget_details.fontcolor = "black";
  }
  const usercss = {
    fontSize: `${budget_details.fontsize}px`,
    color: `${budget_details.fontcolor}`,
  };
  return (
    <div className="container" style={usercss}>
      <div className='row mt-2'>
        <div className='col'>
        <h3 className=''>DASHBOARD</h3> 
        </div>
        <div className='col'>
        <Link to="/source" className="source-link  dashboard-icon cursor-pointer" >
        <img src={icon_source} height={25} width={30} alt="My Image" />
        </Link>
        <Link to="/budget" className="budget-link  dashboard-icon cursor-pointer">
        <img src={icon_budget} height={25} width={30} alt="My Image" />
        </Link>
        <Link to="/settings" className="dashboard-icon cursor-pointer">
        <i className="fa fa-gear text-black "></i>
        </Link>
        <div><i className="fa fa-calendar "></i><input type="month" id="month_input" name="bdaymonth" value={budget_details.selectedmonth} onChange={changemonth} /></div>
        </div>
        </div>
        <div className="row text-white">
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
          <input id="total_income" value={budget_details.selectedmonth === undefined    ? 0 : budget_details[budget_details.selectedmonth].income} className="form-control p-2 heading-input" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details.selectedmonth === undefined   ? 0  : budget_details[budget_details.selectedmonth].savings} className="form-control p-2 heading-input" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details.selectedmonth === undefined  ? 0  : budget_details[budget_details.selectedmonth].expenses} className="form-control p-2 heading-input" readOnly />
        </div>
      </div>
      <br />
      <div className=''>
      {(budget_details.selectedmonth !== null && budget_details.selectedmonth !== undefined && budget_details[budget_details.selectedmonth].selectedsource !== null) ?
      budget_details[budget_details.selectedmonth].selectedsource !== null ?
      budget_details[budget_details.selectedmonth].selectedsource.length !== 0 ?
      
      <div className="Piechartt">
      <div className='card-text heading-text p-2 d-flex justify-content-center'> 
      <PieChartSource data={budget_details[budget_details.selectedmonth].selectedsource} />
      </div>
      <div className=" card-text p-2 d-flex justify-content-center">Source of Income</div>
    </div>
    :
    <></>
    :
    <></>
    :
    <></>
      }

      {(budget_details.selectedmonth !== null && budget_details.selectedmonth !== undefined && budget_details[budget_details.selectedmonth].budget !== null) ?
      budget_details[budget_details.selectedmonth].budget.filter(prev=>prev.type==="S").length!==0 ?
            <div className="Piechartt">
            <div className='card-text heading-text p-2 d-flex justify-content-center'> 
            <PieChartSavings data={budget_details[budget_details.selectedmonth].budget.filter(prev=>prev.type==="S")} />
            </div>
            <div className=" card-text p-2 d-flex justify-content-center">Monthly Savings</div>
          </div>
          :
          <></>
          :
          <></>
      }
      {(budget_details.selectedmonth !== null && budget_details.selectedmonth !== undefined && budget_details[budget_details.selectedmonth].budget !== null) ?
      budget_details[budget_details.selectedmonth].budget.filter(prev=>prev.type!=="S").length !==0 ?
            <div className="Piechartt">
            <div className='card-text heading-text p-2 d-flex justify-content-center'> 
            <PieChartExpenses data={budget_details[budget_details.selectedmonth].budget.filter(prev=>prev.type!=="S")} />
            </div>
            <div className=" card-text p-2 d-flex justify-content-center">Monthly Expenses</div>
          </div>
          :
          <></>
          :
          <></>
      }

      <br />
    </div>
    </div>
  );
};

export default Dashboard;
