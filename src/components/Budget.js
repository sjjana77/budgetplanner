import React, { useEffect, useState, useContext, useRef } from 'react'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import './style.css';
import icon_source from '../icons/sourceincome.png';
import icon_budget from '../icons/budget.png';

const Budget = () => {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [count,setcount] = useState(0);
    const options = [{type: 'E', category:'Credit Card'}, {type: 'E', category:'School Fees'},
    {type: 'E', category:'Medicines'},
    {type: 'S', category:'Post Office'},
    {type: 'S', category:'RD'},
    {type: 'E', category:'EB'}
    ];
    const [budget,setbudget] = useState([]);
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
    const deleteSelectedSource = (value) => {
      setcount(1);
      setbudget(() => budget.filter(prev => prev.category!==value));
    }

    const changeAmount = (e) =>{
        setcount(1);
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
            let result = ( parseInt(value) / budget_details.income) * 100;
            changedvalue = {type: e.target.getAttribute("data-ctype"), category: e.target.name, percentage: result.toFixed(2), amount: parseInt(e.target.value)};
        }
        let tmp = [...budget];
        tmp[index] = changedvalue;
        setbudget(tmp);
      }
      const calculatebBudget = () =>{
        let totalExpense = 0;
        let totalSaving = 0;
        budget.forEach(item => {
            // let amount = (budget_details.income * item.percentage) / 100;
            if (item.type === 'E') {
              totalExpense += item.amount;
            } else if (item.type === 'S') {
              totalSaving += item.amount;
            }
        });
        setbudget_details({...budget_details,savings: totalSaving,expenses: totalExpense})
      }
      useEffect(()=>{
        calculatebBudget();
        if(budget!==null){
          if(budget.length!==0){
            localStorage.setItem("budget", JSON.stringify(budget));
          }
          else{
            if(count===1){
              localStorage.setItem("budget", JSON.stringify([]));
            }
          }
        }
        else{
          setbudget([]);
        }
        // else{
        //   if(count===1){
        //     localStorage.setItem("budget", JSON.stringify([]));
        //   }
        // }
      },[budget])
      const changeSelectValue = ( e, index, value ) =>{
        setcount(1);
        let tmp = [...budget];
        tmp.splice(index,1,{type:e.target.options[e.target.selectedIndex].getAttribute("data-ctype"),category:e.target.value,percentage:0,amount:0});
        setbudget(tmp);
      }
      useEffect(()=>{
        if(count === 0){
          setbudget(JSON.parse(localStorage.getItem("budget")));
          console.log(JSON.parse(localStorage.getItem("budget")));
        }
      },[])
  return (
    <div className="container">
        <div className='row mt-2'>
        <div className='col'>
        <h3 className='text-black'>Budget</h3>
        </div>
        <div className='col'>
            {/* <i className="fa fa-dashboard dashboard-link text-black dashboard-icon cursor-pointer tooltip-btn" onClick={()=>window.location.href = "/budgetplanner/"}></i>
            <i className="fa fa-money source-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/budgetplanner/#/source"} style={{marginTop: "3px"}}></i> */}
<Link to="/" className="fa fa-dashboard dashboard-link text-black dashboard-icon cursor-pointer tooltip-btn" style={{marginTop:"8px"}}>

</Link>
<Link to="/source" className="source-link text-black dashboard-icon cursor-pointer">
<img src={icon_source} height={25} width={30} alt="My Image" />
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
      <div className='row m-0'>
      <div className="col-1 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Type</p>
        </div>
        <div className="col-4 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Category</p>
        </div>
        <div className="col-2 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Amount</p>
        </div>
        <div className="col-2 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Percentage</p>
        </div>
        <div className="col-1 w-12 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center"><i className="fa fa-trash-o delete" style={{fontSize:"5vw"}}></i></p>
        </div>
      </div>  
      {budget !== null ?
      budget.length!==0 ? 
      (
        budget.map((e,index)=>(
        <div className='row m-0'>
            <div className="col-1 w-11 m-0 p-1 col-sm-4 col-md-2">
                <label className='text-black card-text heading-text mt-6 d-flex justify-content-center'>{e.type}</label>
            </div>
          <div className="col-4 w-36 m-0 p-1 col-sm-4 col-md-2">
          <select className='form-select card-text heading-text' aria-label="Default select example" key={index} value={e.category} onChange={(ee)=>changeSelectValue(ee,index,e.category)} >
              <option value={e.category}>{e.category}</option>
              {filteredOptionsdesign()}
          </select>
          </div>
          <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2">
            <input name={e.category} type='number' className="form-control p-1 mb-3 card-text heading-text" placeholder="Amount" value={e.amount} data-ctype={e.type} onChange={changeAmount} />
          </div>
          <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2">
            <input name={e.category} type='number' className="form-control p-1 mb-3 pe-none card-text heading-text" placeholder="%" data-ctype={e.type} value={e.percentage} />
          </div>
          <div className="col-1 w-12 p-1 col-sm-4 col-md-2 cursor-pointer text-black d-flex justify-content-center card-text heading-text" onClick={()=>deleteSelectedSource(e.category)}>
          <span className="mt-6">—</span>
          </div>
        </div>
      ))
      )
      : <></>
    :
    <>{setbudget([])} </>  }
      
      {
         <div id='newsource' className='row m-0' style={{display:"none"}}>
          <div className="col-1 w-11 m-0 p-1 col-sm-4 col-md-2">
          <label className='text-black card-text heading-text d-flex justify-content-center'>S/E</label>
          </div>
         <div className="col-4 w-36 m-0 p-1 col-sm-4 col-md-2">
         <select value={newselectsource} className='form-select card-text heading-text' aria-label="Default select example" onChange={addNewSource}>
          <option value="">Select Source</option>
          {filteredOptionsdesign()}
        </select>
        </div>
        <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2">
        <input type='number' className="form-control card-text heading-text mb-3 pe-none" placeholder="%" id='' />
        </div>

        <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2">
        <input type='number' className="form-control p-1 card-text heading-text mb-3 pe-none" placeholder="Amount" id='' />
        </div>
        <div className="col-1 w-12 p-1 col-sm-4 col-md-2 cursor-pointer text-black d-flex justify-content-center" onClick={()=>document.getElementById("newsource").style.display="none"}>
          —
          </div>
        </div>

      }
        <u className='text-primary heading-text' id='addnewsource' onClick={()=>{document.getElementById("newsource").style.display="flex";
      setcount(1);}}>+ Add New Income</u>
    </div>
  )
}

export default Budget;