import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../UserContext';
import './style.css'

const Budget = () => {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const options = [{type: 'E', category:'Credit Card'}, {type: 'E', category:'School Fees'},
    {type: 'E', category:'Medicines'},
    {type: 'S', category:'Post Office'},
    {type: 'S', category:'RD'},
    {type: 'E', category:'EB'}
    ];
    const [budget,setbudget] = useState([
      {type: "E", category: "Credit Card", percentage: 5, amount: 100},
      {type: "E", category: "School Fees", percentage: 5, amount: 100}
    ]);
    const [newselectsource,setnewselectsource] = useState('');

    const filteredOptionsdesign = () =>{
      const sources = budget.map(item => item.category);
      const filteredOptionss = options.filter((option) => !(sources.includes(option.category)));
      return filteredOptionss.map((ele,i) => (<option key={i} data-ctype={ele.type} value={ele.category}>{ele.category}</option>))
    } 

    const addNewSource = (e) =>{
        if(e.target.value!==""){
          document.getElementById("newsource").style.display = "none";
          setbudget(prev => [...prev,{type:e.target.options[e.target.selectedIndex].getAttribute("data-ctype"),category:e.target.value,percentage:0,amount:0}]);
        }
    }
    const deleteSelectedSource = (value) => setbudget(() => budget.filter(prev => prev.category!==value));

    const changePercentage = (e) =>{
        if(e.target.value[0]==="0"){
            e.target.value = parseInt(e.target.value);
        }
        const index = budget.findIndex(item => item.category === e.target.name);
        let value = 0;
        let changedvalue;
        if(e.target.value===""){
            changedvalue = {type: e.target.getAttribute("data-ctype"), category: e.target.name, percentage: '', amount: 0};
        }
        else{
            value = e.target.value;
            let result = (budget_details.income * parseInt(e.target.value)) / 100;
            changedvalue = {type: e.target.getAttribute("data-ctype"), category: e.target.name, percentage: parseInt(e.target.value), amount: result};
        }
        let tmp = [...budget];
        tmp[index] = changedvalue;
        setbudget(tmp);
      }
      const calculatebBudget = () =>{
        let totalExpense = 0;
        let totalSaving = 0;
        budget.forEach(item => {
            let amount = (budget_details.income * item.percentage) / 100;
            if (item.type === 'E') {
              totalExpense += amount;
            } else if (item.type === 'S') {
              totalSaving += amount;
            }
        });
        setbudget_details({...budget_details,savings: totalSaving,expenses: totalExpense})
      }
      useEffect(()=>{
        calculatebBudget();
      },[budget])
  return (
    <div className="container">
        <div className='row mt-2'>
        <div className='col'>
        <h3 className='text-black'>Budget</h3>
        </div>
        <div className='col'>
            <i className="fa fa-dashboard dashboard-link text-black dashboard-icon cursor-pointer tooltip-btn" onClick={()=>window.location.href = "/"}></i>
            <i className="fa fa-money source-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/#/source"} style={{marginTop: "3px"}}></i>
        </div>
        </div>
        <div className="row">
        <div className="col bg-success m-3 rounded w-100">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Total Income</p>
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
          <input id="total_income" value={budget_details.income} className="form-control p-2" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details.savings} className="form-control p-2" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details.expenses} className="form-control p-2" readOnly />
        </div>
      </div>
      <div className='row'>
      <div className="col-1 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Type</p>
        </div>
        <div className="col-3 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Category</p>
        </div>
        <div className="col-2 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Percentage</p>
        </div>
        <div className="col-3 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Amount</p>
        </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Delete</p>
        </div>
      </div>  
      {budget.length!==0 ? 
      (
        budget.map((e,index)=>(
        <div className='row'>
            <div className="col w-100">
                <label className='text-black  d-flex justify-content-center'>{e.type}</label>
            </div>
          <div className="col w-100">
          <select className='form-select' aria-label="Default select example" key={index} value={e.category} >
              <option value={e.category}>{e.category}</option>
              {filteredOptionsdesign()}
          </select>
          </div>
          <div className="col w-100">
            <input name={e.category} type='number' className="form-control mb-3" placeholder="%" data-ctype={e.type} onChange={changePercentage} value={e.percentage} />
          </div>
          <div className="col w-100">
            <input name={e.category} type='number' className="form-control mb-3 pe-none" placeholder="Amount" value={e.amount} />
          </div>
          <div className="col w-10 cursor-pointer text-black d-flex justify-content-center" onClick={()=>deleteSelectedSource(e.category)}>
          —
          </div>
        </div>
      ))
      )
      : <></>}
      
      {
         <div id='newsource' className='row' style={{display:"none"}}>
          <div className="col w-100">
          <label className='text-black d-flex justify-content-center'>S/E</label>
          </div>
         <div className="col w-100">
         <select value={newselectsource} className='form-select' aria-label="Default select example" onChange={addNewSource}>
          <option value="">Select Source</option>
          {filteredOptionsdesign()}
        </select>
        </div>
        <div className="col w-100">
        <input type='number' className="form-control mb-3 pe-none" placeholder="%" id='' />
        </div>

        <div className="col w-100">
        <input type='number' className="form-control mb-3 pe-none" placeholder="Amount" id='' />
        </div>
        <div className="col w-100 cursor-pointer text-black d-flex justify-content-center" onClick={()=>document.getElementById("newsource").style.display="none"}>
          —
          </div>
        </div>

      }
        <u className='text-primary' id='addnewsource' onClick={()=>document.getElementById("newsource").style.display="flex"}>+ Add New Income</u>
    </div>
  )
}

export default Budget;