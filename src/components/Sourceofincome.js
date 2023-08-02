import React, { useEffect, useState, useContext, useRef } from 'react'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import './style.css';
import icon_source from '../icons/sourceincome.png';
import icon_budget from '../icons/budget.png';

const Sourceofincome = () => {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [count,setcount] = useState(0);
    const options = ['Salary', 'Rent', 'Shares', 'FD', 'RD'];
    const [selectedsource,setselectedsource] = useState([]);
    const [newselectsource,setnewselectsource] = useState('');
    const calculateTotalIncome = () =>{
      let t = 0;
      selectedsource.map(src => t+=parseInt(src.income));
      if(isNaN(t)){
        t="";
      }
      setbudget_details({...budget_details,income:t});
    }
    // const selectsources = () =>{
    //     const filteredOptions = options.filter((option) => selectedsource.includes(option));
    //     const filteredOptionsdesign = filteredOptions.map((ele,i) => (<option key={i} value={ele}>ele</option>));
    //     const mapping = selectedsource.map((e,index)=>(
    //         <select className='form-select' aria-label="Default select example" key={index} index={index} value={e} >
    //             <option value={e}>e</option>
    //             {filteredOptionsdesign}
    //         </select>
            
    //     ));
    //     return(
    //         {mapping}
    //     )
    // }
    // const filteredOptions = options.filter((option) => (selectedsource.includes(option)));
    // const filteredOptionsdesign = filteredOptions.map((ele,i) => (<option key={i} value={ele}>{ele}</option>))
    const filteredOptionsdesign = () =>{
      const sources = selectedsource.map(item => item.source);
      const filteredOptionss = options.filter((option) => !(sources.includes(option)));
      return filteredOptionss.map((ele,i) => (<option key={i} value={ele}>{ele}</option>))
    } 
//     const selectedSourceMap = () =>{
//       return (
// <></>
//       )
//     }
    const addNewSource = (e) =>{
      if(e.target.value!==""){
        document.getElementById("newsource").style.display = "none";
        setselectedsource(prev => [...prev,{source:e.target.value,income:""}]);
      }
    }
    const changeSelectValue = ( e, index, value ) =>{
      setcount(1);
      let tmp = [...selectedsource];
      tmp.splice(index,1,{source:e.target.value, income: "", percent: ""});
      setselectedsource(tmp);
    }
    const deleteSelectedSource = (value) => {
      setcount(1);
      let tmp = [...selectedsource];
      let previncome = 0;
      tmp = tmp.filter(prev => prev.source!==value);
      let t = 0;
      tmp.map(src => t+=parseInt(src.income));
      for (let i = 0; i < tmp.length; i++) {
        let percent = (parseInt(tmp[i].income)/parseInt(t))*100;
        tmp[i] = {...tmp[i],percent: percent.toFixed(2)};
      }
      setselectedsource(tmp);
    }
    const changeIncome = (e) =>{
      setcount(1);
      const index = selectedsource.findIndex(item => item.source === e.target.name);
      let value = 0;
      if(e.target.value!==""){
        value = parseInt(e.target.value)
        e.target.value = value;
      }
      let tmp = [...selectedsource];
      let total_incomee = e.target.value - tmp[index].income;
      if(total_incomee<0){
        total_incomee = parseInt(budget_details.income) - Math.abs(total_incomee);
      }
      else{
        total_incomee = parseInt(budget_details.income) + parseInt(total_incomee);
      }
      const changedvalue = {source: e.target.name, income: value};
      tmp[index] = changedvalue;
      for (let i = 0; i < tmp.length; i++) {
        let percent = (parseInt(tmp[i].income)/parseInt(total_incomee))*100;
        tmp[i] = {...tmp[i],percent: percent.toFixed(2)};
      }
      setselectedsource(tmp);
    }
    useEffect(()=>{
      calculateTotalIncome();
      if(selectedsource !== null){
              if(selectedsource.length!==0){
        localStorage.setItem("selectedsource", JSON.stringify(selectedsource));
      }
      else{
        if(count===1){
          localStorage.setItem("selectedsource", JSON.stringify([]));
        }
      }
      }
      else{
        setselectedsource([]);
      }

    },[selectedsource])

    useEffect(()=>{
      if(count === 0){
        setselectedsource(JSON.parse(localStorage.getItem("selectedsource")));
      }
    },[])
    // useEffect(()=>{
    //   console.log(incomedetails);
    // })
  return (
    <div className="container">
      <div className='row mt-2'>
        <div className='col'>
        <h3 className='text-black'>Source of Income</h3>
        </div>
        <div className='col'>
        <Link to="/" className="fa fa-dashboard dashboard-link text-black dashboard-icon cursor-pointer tooltip-btn" style={{marginTop:"8px"}}></Link>
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
      <div className="row m-0">
        <div className="col-4 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Source</p>
        </div>
        <div className="col-3 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Amount</p>
        </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded w-23">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Percentage</p>
        </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 bg-primary m-1 rounded">
          <p className="card-text heading-text p-2 d-flex justify-content-center"><i className="fa fa-trash-o delete" style={{fontSize:"5vw"}}></i></p>
        </div>
      </div>
      {selectedsource!== null ?
      selectedsource.length!==0 ? 
      (
      selectedsource.map((e,index)=>(
        <div className='row m-0'>
          <div className="col-4 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <select className='form-select heading-input card-text heading-text' aria-label="Default select example" key={index} value={e.source} onChange={(ee)=>changeSelectValue(ee,index,e.source)} >
              <option value={e.source}>{e.source}</option>
              {filteredOptionsdesign()}
          </select>
          </div>
          <div className="col-3 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
            <input name={e.source} type='number' className="form-control mb-3 heading-input card-text heading-text" placeholder={"Amount of "+e.source} onChange={changeIncome} value={e.income} />
          </div>
          <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded w-23">
            <input name={e.source} type='number' className="form-control mb-3 heading-input pe-none card-text heading-text" placeholder={"%"} onChange={changeIncome} value={e.percent} />
          </div>
          <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded cursor-pointer text-black d-flex justify-content-center" onClick={()=>deleteSelectedSource(e.source)}>
          —
          </div>
        </div>
      ))
      )  
      : <></>
    :
    <>{setselectedsource([])}</>}
      
      {
         <div id='newsource' className='row m-0' style={{display:"none"}}>
         <div className="col-4 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
         <select value={newselectsource} className='form-select heading-input card-text heading-text' aria-label="Default select example" onChange={addNewSource}>
          <option value="">Select Source</option>
          {filteredOptionsdesign()}
        </select>
        </div>
        <div className="col-3 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
        <input type='number' className="form-control mb-3 heading-input card-text heading-text" placeholder="Select Source" id='' />
        </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded w-23">
            <input type='number' className="form-control mb-3 heading-input pe-none card-text heading-text" placeholder="%"  />
          </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded cursor-pointer text-black d-flex justify-content-center" onClick={()=>document.getElementById("newsource").style.display="none"}>
          —
          </div>
        </div>

      }
        <u className='text-primary ' id='addnewsource' onClick={()=>{document.getElementById("newsource").style.display="flex";
      setcount(1);}}>+ Add New Income</u>
    </div>
  )
}

export default Sourceofincome;