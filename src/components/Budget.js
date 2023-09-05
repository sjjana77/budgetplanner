import React, { useEffect, useState, useContext, useRef } from 'react'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import './style.css';
import Select from 'react-select';
import icon_source from '../icons/sourceincome.png';
import icon_budget from '../icons/budget.png';

const Budget = ({ convertToMonthYear }) => {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [count,setcount] = useState(0);
    const options = budget_details.budget_options;
    const [budget,setbudget] = useState([]);
    const [newselectsource,setnewselectsource] = useState('');
    const [currentswipingrow,setcurrentswipingrow] = useState('');
    const [deleteindex,setdeleteindex] = useState('');
    const [newsourcedisplay,setnewsourcedisplay] = useState(false);

    const getOptionLabel = (option) => {
      return (
        <div>
          {option.label} - <span className="ctype">{option.ctype}</span>
        </div>
      );
    };

    const filteredOptionsdesign = (e,index) =>{
      let sources = [];
      if(budget !== null){
        sources = budget.map(item => item.category);
      }
      const filteredOptionss = options.filter((option) => !(sources.includes(option.category)));
      let tt = filteredOptionss.map((ele,i) => ({label:ele.category,value:ele.category,type:ele.type}));
      // return filteredOptionss.map((ele,i) => (<option key={i} data-ctype={ele.type} value={ele.category}>{ele.category}</option>))
      if(e!==undefined && index!== undefined){
        return <Select
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '30px', // Adjust the height as needed
          }),
        }}
        className='selectt' key={index} options={tt} value={{label:e.category,value:e.category}} onChange={(ee)=>changeSelectValue(ee,index,e.category)} isSearchable  />;
        
      }
      else{
        return <Select
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '30px', // Adjust the height as needed
          }),
        }}
        className='selectt' options={[{label:"Select",value:""},...tt]} value="" onChange={addNewSource} placeholder="Select" />;
      }
    }

    const addNewSource = (e) =>{
        
        if(e.value!==""){
          setnewsourcedisplay(false);
          // document.getElementById("newsource").style.display = "none";
          // setbudget(prev => [...prev,{type:e.target.options[e.target.selectedIndex].getAttribute("data-ctype"),category:e.target.value,percentage:0,amount:0}]);
          // console.log(e.type);
          let index,cc;
          if(e.type === "E"){
            index = budget_details.expenses_count.findIndex(item => item.name === e.value);
             cc = [...budget_details.expenses_count];
            if(index !== -1){
              cc[index] = {name: e.value,count: cc[index].count+1};
            }
            else{
              cc.push({name:e.value,count:1});
            }
            setbudget_details({...budget_details,expenses_count:cc});
          }
          else{
            index = budget_details.savings_count.findIndex(item => item.name === e.value);
            cc = [...budget_details.savings_count];
           if(index !== -1){
             cc[index] = {name: e.value,count: cc[index].count+1};
           }
           else{
             cc.push({name:e.value,count:1});
           }
           setbudget_details({...budget_details,savings_count:cc});
          }


          setbudget(prev => [...prev,{type:e.type,category:e.value,percentage:0,amount:0}]);
        }
    }
    const deleteSelectedSource = (value,type,ii) => {
      setcurrentswipingrow(ii);
      setanimatecss('-450');
      setcount(1);
      let index,cc;
      if(type === "E"){
        index = budget_details.expenses_count.findIndex(item => item.name === value);
        cc = [...budget_details.expenses_count];
        if(index !== -1){
          cc[index] = {name: value,count: cc[index].count-1};
        }
        else{
          cc.push({name:value,count:1});
        }
        setTimeout(() => {
          setcurrentswipingrow(-1);
          setdeleteindex(ii);
        }, 200);
        setTimeout(() => {
          setdeleteindex(-1);
          setbudget_details({...budget_details,expenses_count:cc});
          setcurrentswipingrow('');
          setbudget(() => budget.filter(prev => prev.category!==value));
          //setanimatecss(0);
        }, 300);
      }
      else{
        index = budget_details.savings_count.findIndex(item => item.name === value);
        cc = [...budget_details.savings_count];
        if(index !== -1){
          cc[index] = {name: value,count: cc[index].count-1};
        }
        else{
          cc.push({name:value,count:1});
        }
        setTimeout(() => {
          setcurrentswipingrow(-1);
          setdeleteindex(ii);
        }, 200);
        setTimeout(() => {
          setdeleteindex(-1);
          setbudget_details({...budget_details,savings_count:cc});
          setcurrentswipingrow('');
          setbudget(() => budget.filter(prev => prev.category!==value));
          //setanimatecss(0);
        }, 300);
      }


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
            let result = ( parseInt(value) / budget_details[budget_details.selectedmonth].income) * 100;
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
        let tmp = {...budget_details};
        tmp[budget_details.selectedmonth].savings = totalSaving;
        tmp[budget_details.selectedmonth].expenses = totalExpense;
        setbudget_details(tmp);
      }
      useEffect(()=>{
        calculatebBudget();
        if(budget!==null){
          if(budget.length!==0){
            let tmp = {...budget_details};
            tmp[budget_details.selectedmonth].budget = budget;
            setbudget_details(tmp);
          }
          else{
            if(count===1){
              let tmp = {...budget_details};
              tmp[budget_details.selectedmonth].budget = [];
              setbudget_details(tmp);
            }
          }
        }
        else{
          setbudget([]);
        }
        // calculatebBudget();
        // if(budget!==null){
        //   if(budget.length!==0){
        //     let dataToStore = {
        //       ...budget_details,
        //       budget: budget
        //     };
        //     localStorage.setItem("budget", JSON.stringify(dataToStore));
        //   }
        //   else{
        //     if(count===1){
        //       localStorage.setItem("budget", JSON.stringify([]));
        //     }
        //   }
        // }
        // else{
        //   setbudget([]);
        // }


        // else{
        //   if(count===1){
        //     localStorage.setItem("budget", JSON.stringify([]));
        //   }
        // }
      },[budget])
      const changeSelectValue = ( e, index, value ) =>{
        setcount(1);
        let tmp = [...budget];
        // tmp.splice(index,1,{type:e.target.options[e.target.selectedIndex].getAttribute("data-ctype"),category:e.target.value,percentage:0,amount:0});
        tmp.splice(index,1,{type:e.type,category:e.value,percentage:0,amount:0});
        setbudget(tmp);
      }
      useEffect(()=>{
        if(count === 0){
          setbudget(JSON.parse(localStorage.getItem("budget_details"))[budget_details.selectedmonth].budget);
        }
      },[])
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
      const [isSwiping, setIsSwiping] = useState(false);
      const [startX, setStartX] = useState(null);
      const [animatecss,setanimatecss] = useState('0');
  
    const handleTouchStart = (e,index) => {
      setcurrentswipingrow(index);
      setanimatecss('0');
      setStartX(e.touches[0].clientX);
    };
    const handleTouchMove = (e) => {
      if (!startX) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      if((deltaX < 0 ) && (deltaX > -80)){
  
        setanimatecss(deltaX);
      }
      if (deltaX < -80) {
        setIsSwiping(true);
      }
    };
    
    const handleTouchEnd = (e,value,type) => {
      if (isSwiping) {
        setIsSwiping(false);
        setcurrentswipingrow(e);
        if(animatecss > -10){
          setcurrentswipingrow('');
        }
        else{
          if(value !== undefined){
            deleteSelectedSource(value, type, e);
          }
          else{
            setnewsourcedisplay(false);
            setanimatecss(0);
          }
        }
      }
      else{
        if(animatecss > -80){
          setcurrentswipingrow('');
        }
  
      }
    };
  
  return (
    <div className="container" style={usercss}>
        <div className='row mt-3'>
        <div className='col'>
        <h3 className=''>Budget</h3>
        </div>
        <div className='col'>
            {/* <i className="fa fa-dashboard dashboard-link  dashboard-icon cursor-pointer tooltip-btn" onClick={()=>window.location.href = "/budgetplanner/"}></i>
            <i className="fa fa-money source-link  dashboard-icon cursor-pointer" onClick={()=>window.location.href = "/budgetplanner/#/source"} style={{marginTop: "3px"}}></i> */}
          <span className='show_month'>{convertToMonthYear(budget_details.selectedmonth)}</span>
          <Link to="/" className="fa fa-arrow-circle-left  dashboard-icon cursor-pointer"></Link>
        </div>
        </div>
        <div className="row text-white">
        <div className="col bg-success m-3 rounded w-100">
        <Link to="/source" className="d-block">
          <p className="card-text heading-text p-2 d-flex justify-content-center text-white">Income<br /> {(budget_details.selectedmonth === undefined || budget_details.selectedmonth === "") ? 0 : budget_details[budget_details.selectedmonth].income}</p>
        </Link>
        </div>
        <div className="col bg-warning m-3 rounded w-100">
        <Link to="/budget" className="d-block">
          <p className="card-text heading-text p-2 d-flex justify-content-center text-white">Savings<br /> {(budget_details.selectedmonth === undefined || budget_details.selectedmonth === "") ? 0 : budget_details[budget_details.selectedmonth].savings}</p>
        </Link>
        </div>
        <div className="col bg-danger m-3 rounded w-100">
          <Link to="/budget" className="d-block">
          <p className="card-text heading-text p-2 d-flex justify-content-center text-white">Expenses<br /> {(budget_details.selectedmonth === undefined || budget_details.selectedmonth === "")  ? 0 : budget_details[budget_details.selectedmonth].expenses}</p>
          </Link>
        </div>
        </div>
      {/* <div className="row">
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details[budget_details.selectedmonth].income} className="form-control p-2 heading-input" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details[budget_details.selectedmonth].savings} className="form-control p-2 heading-input" readOnly />
        </div>
        <div className="col rounded w-100">
          <input id="total_income" value={budget_details[budget_details.selectedmonth].expenses} className="form-control p-2 heading-input" readOnly />
        </div>
      </div> */}
      <br />
      <div className="row m-0 bg-grid heading-grid" style={{borderBottom: "1px solid white"}}>
      <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center ">Type</p>
        </div>
        <div className="col-4 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Category</p>
        </div>
        <div className="col-2 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Amount</p>
        </div>
        <div className="col-2 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Percentage</p>
        </div>
        <div className="col-1 w-12 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text d-flex justify-content-center">Action</p>
        </div>
      </div>  
      {budget !== null ?
      budget.length!==0 ? 
      (
        budget.map((e,index)=>(
        <div className='row m-0 bg-grid swipe-list-item'
        onTouchStart={(e)=>handleTouchStart(e,index)}
        onTouchMove={handleTouchMove}
        onTouchEnd={()=>handleTouchEnd(index,e.category,e.type)}
        style={{
          transform: currentswipingrow === index ? 'translateX('+animatecss+'px)' : 'translateX(0)',
          display : deleteindex === index ? 'none' : ''
        }}
        >
            <div className="col-1 w-11 m-0 p-1 col-sm-4 col-md-2">
                <label className=' card-text heading-text mt-9 d-flex justify-content-center'>{e.type}</label>
            </div>
          <div className="col-4 w-36 m-0 p-1 col-sm-4 col-md-2">
          {/* <select className='form-select card-text heading-text' aria-label="Default select example" key={index} value={e.category} onChange={(ee)=>changeSelectValue(ee,index,e.category)} >
              <option value={e.category}>{e.category}</option>
              {filteredOptionsdesign()}
          </select> */}
          {filteredOptionsdesign(e,index)}
          </div>
          <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2">
            <input name={e.category} type='number' className="mt-2 form-control p-1 mb-3 card-text heading-text" placeholder="Amount" value={e.amount} data-ctype={e.type} onChange={changeAmount} onFocus={(e)=>{
            if(e.target.value==="0"){
              e.target.value="";
            }
          }} />
          </div>
          <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2">
            <input name={e.category} type='number' className="mt-2 form-control p-1 mb-3 pe-none card-text heading-text" placeholder="%" data-ctype={e.type} value={e.percentage} />
          </div>
          <div className="col-1 w-12 p-1 col-sm-4 col-md-2 cursor-pointer  d-flex justify-content-center card-text heading-text" onClick={()=>deleteSelectedSource(e.category,e.type)}>
          <span className="mt-6"> <i className="fa fa-trash-o delete" style={{fontSize:"5vw"}}></i></span>
          </div>
          {currentswipingrow === index && (
          <div className="delete-button">
  
          <svg class="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
          <path class="trash-lid" style={{transform : (Math.abs(animatecss) > 22 && Math.abs(animatecss) < 52) ? "translateY(-2px) rotate("+(Math.abs(animatecss)-18)+"deg)" : "transform: translateY(-2px) rotate(30deg)"}} fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
          <path class="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
        </svg> 
        </div>
        )}
        </div>
      ))
      )
      : <></>
    :
    <>{setbudget([])} </>  }
      
      {
         <div id='newsource' className='row m-0 bg-grid'
         onTouchStart={(e)=>handleTouchStart(e)}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         style={{
           transform: (currentswipingrow===-1 || currentswipingrow==='') && !newsourcedisplay ? 'translateX('+animatecss+'px)' : 'translateX(0px)',
           display: newsourcedisplay ? "flex" : "none"
         }}
         >
          <div className="col-1 w-11 m-0 p-1 col-sm-4 col-md-2">
          <label className=' card-text heading-text d-flex justify-content-center mt-9 delete'>S/E</label>
          </div>
         <div className="col-4 w-36 m-0 p-1 col-sm-4 col-md-2">
         {/* <select value={newselectsource} className='form-select card-text heading-text' aria-label="Default select example" onChange={addNewSource}>
          <option value="">Select Source</option>
          {filteredOptionsdesign()}
          </select> */}
          {filteredOptionsdesign()}
        </div>
        <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2" >
        <input type='number' className="form-control card-text heading-text mb-3 pe-none" placeholder="Amount" id='' />
        </div>

        <div className="col-2 w-19 m-0 p-1 col-sm-4 col-md-2">
        <input type='number' className="form-control p-1 card-text heading-text mb-3 pe-none" placeholder="%" id='' />
        </div>
        <div className="col-1 w-12 p-1 col-sm-4 col-md-2 cursor-pointer  d-flex justify-content-center" onClick={()=>setnewsourcedisplay(false)}>
        <i className="fa fa-trash-o delete" style={{fontSize:"5vw"}}></i>
          </div>
          
          <div className="delete-button">
  
          <svg class="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
          <path class="trash-lid" style={{transform : (Math.abs(animatecss) > 22 && Math.abs(animatecss) < 52) ? "translateY(-2px) rotate("+(Math.abs(animatecss)-18)+"deg)" : "transform: translateY(-2px) rotate(30deg)"}} fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
          <path class="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
        </svg> 
        </div>
        
        </div>

      }
        <u className='text-primary heading-text' id='addnewsource' onClick={()=>{setanimatecss(0);setnewsourcedisplay(true);
      setcount(1);}}>+ Add New Type</u>
    </div>
  )
}

export default Budget;