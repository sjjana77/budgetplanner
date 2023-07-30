import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../UserContext';
import './style.css'

const Sourceofincome = () => {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const options = ['Salary', 'Rent', 'Shares', 'FD', 'RD'];
    const [selectedsource,setselectedsource] = useState([
      {source: "FD", income: "1000"},
      {source: "RD", income: "3000"}
    ]);
    const [newselectsource,setnewselectsource] = useState('');
    const calculateTotalIncome = () =>{
      let t = 0;
      selectedsource.map(src => t+=parseInt(src.income));
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
        setselectedsource(prev => [...prev,{source:e.target.value,income:0}]);
      }
    }
    const changeSelectValue = ( e, index, value ) =>{
      let tmp = [...selectedsource];
      tmp.splice(index,1,e.target.value);
      setselectedsource(tmp);
    }
    const deleteSelectedSource = (value) => setselectedsource(() => selectedsource.filter(prev => prev.source!==value))
    const changeIncome = (e) =>{
      const index = selectedsource.findIndex(item => item.source === e.target.name);
      let value = 0;
      if(e.target.value!==""){
        value = e.target.value
      }
      const changedvalue = {source: e.target.name, income: value};
      let tmp = [...selectedsource];
      tmp[index] = changedvalue;
      setselectedsource(tmp);
    }
    useEffect(()=>{
      calculateTotalIncome();
    },[selectedsource])
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
            <i className="fa fa-dashboard dashboard-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/"}></i>
            <i className="fa fa-bitcoin budget-link text-black dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/#/budget"}></i>
        </div>
        </div>
        <div className="row">
        <div className="col bg-success m-3 rounded w-100">
          <p className="card-text p-2 d-flex justify-content-center">Total Income</p>
        </div>
        <div className="col bg-warning m-3 rounded w-100">
          <p className="card-text p-2 d-flex justify-content-center">Savings</p>
        </div>
        <div className="col bg-danger m-3 rounded w-100">
          <p className="card-text p-2 d-flex justify-content-center">Expenses</p>
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
      <div className="col w-100 bg-primary m-1 rounded">
          <p className="card-text p-2 d-flex justify-content-center">Income Source</p>
        </div>
        <div className="col w-100 bg-primary m-1 rounded">
          <p className="card-text p-2 d-flex justify-content-center">Amount</p>
        </div>
        <div className="col w-100 bg-primary m-1 rounded">
          <p className="card-text p-2 d-flex justify-content-center">Delete</p>
        </div>
      </div>  
      {selectedsource.length!==0 ? 
      (
      selectedsource.map((e,index)=>(
        <div className='row'>
          <div className="col w-100">
          <select className='form-select' aria-label="Default select example" key={index} value={e.source} onChange={(ee)=>changeSelectValue(ee,index,e.source)} >
              <option value={e.source}>{e.source}</option>
              {filteredOptionsdesign()}
          </select>
          </div>
          <div className="col w-100">
            <input name={e.source} type='number' className="form-control mb-3" placeholder={"Amount of "+e.source} onChange={changeIncome} value={e.income} />
          </div>
          <div className="col w-10 cursor-pointer text-black d-flex justify-content-center" onClick={()=>deleteSelectedSource(e.source)}>
          —
          </div>
        </div>
      ))
      )
      : <></>}
      
      {
         <div id='newsource' className='row' style={{display:"none"}}>
         <div className="col-5">
         <select value={newselectsource} className='form-select' aria-label="Default select example" onChange={addNewSource}>
          <option value="">Select Source</option>
          {filteredOptionsdesign()}
        </select>
        </div>
        <div className="col-5">
        <input type='number' className="form-control mb-3" placeholder={"Select Source"} id='' />
        </div>
        <div className="col-2 cursor-pointer text-black" onClick={()=>document.getElementById("newsource").style.display="none"}>
          —
          </div>
        </div>

      }
        <u className='text-primary' id='addnewsource' onClick={()=>document.getElementById("newsource").style.display="flex"}>+ Add New Income</u>
    </div>
  )
}

export default Sourceofincome;