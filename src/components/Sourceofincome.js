import React, { useEffect, useState, useContext, useRef } from 'react'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom'; 
import Select from 'react-select';
import './style.css';
import delete_music from './delete_music.mp3';
// import { Swipeable } from 'react-swipeable'; 
// import Swipeable from 'react-native-gesture-handler/Swipeable';
// import icon_source from '../icons/sourceincome.png';
// import icon_budget from '../icons/budget.png';

const Sourceofincome = ({ convertToMonthYear }) => {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [count,setcount] = useState(0);
    const options = budget_details.source_options;
    const [selectedsource,setselectedsource] = useState([]);
    const [newselectsource,setnewselectsource] = useState('');
    const [currentswipingrow,setcurrentswipingrow] = useState('');
    const [deleteindex,setdeleteindex] = useState('');
    const [newsourcedisplay,setnewsourcedisplay] = useState(false);

    const calculateTotalIncome = () =>{
      let t = 0;
      selectedsource.map(src => t+=parseInt(src.income));
      if(isNaN(t)){
        t="";
      }
      let tmp = {...budget_details};
      tmp[budget_details.selectedmonth].income = t;
      setbudget_details(tmp);
    }
    // const handleSwipe = (e, index, value) => {
    //   if (e.dir === 'Left') {
    //     // Handle swipe left action
    //     deleteSelectedSource(value);
    //   }
    // };
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
    const filteredOptionsdesign = (e,index) =>{
      let sources = [];
      if(selectedsource !== null){
        sources = selectedsource.map(item => item.source);
      }
      const filteredOptionss = options.filter((option) => !(sources.includes(option)));
      let tt = filteredOptionss.map((ele,i) => ({label:ele,value:ele}));
      if(e!==undefined && index!== undefined){
        return <Select
        className='selectt' key={index} options={tt} value={{label:e.source,value:e.source}} onChange={(ee)=>changeSelectValue(ee,index,e.source)}
        
        />;
        
      }
      else{
        return <Select className='selectt' options={[{label:"Select",value:""},...tt]} value="" onChange={addNewSource} placeholder="Select" />;
      }
      // return filteredOptionss.map((ele,i) => (<option key={i} value={ele}>{ele}</option>))
    } 
//     const selectedSourceMap = () =>{
//       return (
// <></>
//       )
//     }
    const addNewSource = (e) =>{
      if(e.value!==""){
        document.getElementById("newsource").style.display = "none";
        let index = budget_details.source_count.findIndex(item => item.name === e.value);
        let cc = [...budget_details.source_count];
        if(index !== -1){
          cc[index] = {name: e.value,count: cc[index].count+1};
        }
        else{
          cc.push({name:e.value,count:1});
        }
        setbudget_details({...budget_details,source_count:cc});
        setselectedsource(prev => [...prev,{source:e.value,income:0,percent:0}]);
      }
    }
    const changeSelectValue = ( e, index, value ) =>{
      setcount(1);
      let tmp = [...selectedsource];
      tmp.splice(index,1,{source:e.value, income: 0, percent: ""});
      setselectedsource(tmp);
    }
    const deleteSelectedSource = async (value,ii) => {
      await document.getElementById("audioPlayer").play();
      setTimeout(() => {
        setcurrentswipingrow(ii);
        setanimatecss('-450');
        setcount(1);
        let tmp = [...selectedsource];
        let previncome = 0;
        tmp = tmp.filter(prev => prev.source!==value);
        let t = 0;
        tmp.map(src => t+=parseInt(src.income));
  
        let index = budget_details.source_count.findIndex(item => item.name === value);
        let cc = [...budget_details.source_count];
        if(index !== -1){
          cc[index] = {name: value,count: cc[index].count-1};
        }
        setbudget_details({...budget_details,source_count:cc});
        for (let i = 0; i < tmp.length; i++) {
          let percent = (parseInt(tmp[i].income)/parseInt(t))*100;
          tmp[i] = {...tmp[i],percent: percent.toFixed(2)};
        }
        // setselectedsource(tmp);
        setTimeout(() => {
          setcurrentswipingrow('');
          setdeleteindex(ii);
        }, 200);
        setTimeout(() => {
          setdeleteindex('');
          setcurrentswipingrow('');
          setselectedsource(tmp);
        }, 300);
      }, 60);

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
        total_incomee = parseInt(budget_details[budget_details.selectedmonth].income) - Math.abs(total_incomee);
      }
      else{
        total_incomee = parseInt(budget_details[budget_details.selectedmonth].income) + parseInt(total_incomee);
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

            let tmp = {...budget_details};
            tmp[budget_details.selectedmonth].selectedsource = selectedsource; 
            setbudget_details(tmp);
            
      }
      else{
        if(count===1){
          let tmp = {...budget_details};
          tmp[budget_details.selectedmonth].selectedsource = []; 
          setbudget_details(tmp);
        }
      }
      }
      else{
        setselectedsource([]);
      }

    },[selectedsource])

    useEffect(()=>{
      if(count === 0){
        if(JSON.parse(localStorage.getItem('budget_details'))[budget_details.selectedmonth] === null || JSON.parse(localStorage.getItem('budget_details'))[budget_details.selectedmonth] === "")  {
        let empty_month = {income:"",savings:"",expenses:"",selectedsource:[],budget:[]};
        setbudget_details({...budget_details,[budget_details.selectedmonth]: empty_month});
        }
        else{
          setselectedsource(JSON.parse(localStorage.getItem('budget_details'))[budget_details.selectedmonth].selectedsource);
        }       
      }
      document.getElementById("audioPlayer").playbackRate ="2.0";
    },[])
    // useEffect(()=>{
    //   console.log(incomedetails);
    // })
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
    if((deltaX < -3 ) && (deltaX > -80)){
      document.getElementById("root").style.position = "fixed";
      setanimatecss(deltaX);
    }
    if (deltaX < -80) {
      setIsSwiping(true);
    }
  };

  // useEffect(()=>{
  //   console.log(animatecss);
  // },[animatecss]);

  const handleTouchEnd = (e,value) => {
    if (isSwiping) {
      setIsSwiping(false);

      setcurrentswipingrow(e);
      if(animatecss > -30){ //old value -10
        setcurrentswipingrow('');
      }
      else{
        if(value !== undefined){
          deleteSelectedSource(value, e);
        }
          
        else{
          setanimatecss(-450);
          setcurrentswipingrow(-1);
          setTimeout(() => {
            setnewsourcedisplay(false);
            setanimatecss(0);
          }, 150);
        }
        // deleteSelectedSource(value,e);
      }
    }
    else{
      if(animatecss > -80){
        setcurrentswipingrow('');
      }

    }
    document.getElementById("root").style.position = "";
  };

  return (
    <div className="container sourceofincome openingchildcomponents" id='sourceofincome' style={usercss}>
      <audio id="audioPlayer" style={{display:"none"}} controls>
      <source src={delete_music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className='row mt-3'>
        <div className='col'>
        <h3 className=''>Source of Income</h3>
        </div>
        <div className='col'>
        <span className='show_month'>{convertToMonthYear(budget_details.selectedmonth)}</span>
        <Link to="/" className="fa fa-arrow-circle-left  dashboard-icon cursor-pointer"></Link>
        </div>
        </div>
        <div className="row text-white">
        <div className="col bg-success m-3 rounded w-100">
        <Link to="/source" className="d-block highlight-btnn">
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
        <div className="col-4 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Source</p>
        </div>
        <div className="col-3 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Amount</p>
        </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded w-23">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Percentage</p>
        </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          <p className="card-text heading-text p-2 d-flex justify-content-center">Action</p>
        </div>
      </div>
      {selectedsource!== null ?
      selectedsource.length!==0 ? 
      (
      selectedsource.map((e,index)=>(
        <div className={`row m-0 bg-grid swipe-list-item`} data-value={e.source}
        onTouchStart={(e)=>handleTouchStart(e,index)}
        onTouchMove={handleTouchMove}
        onTouchEnd={()=>handleTouchEnd(index,e.source)}
        style={{
          transform: currentswipingrow === index ? 'translateX('+animatecss+'px)' : '',
          display : deleteindex === index ? 'none' : ''
        }} >
          <div className="col-4 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
          {/* <select className='form-select heading-input card-text heading-text' aria-label="Default select example" key={index} value={e.source} onChange={(ee)=>changeSelectValue(ee,index,e.source)} >
              <option value={e.source}>{e.source}</option>
              
          </select> */}
          {/* <Select key={index} options={foptions} value={{label:e.source,value:e.source}} onChange={(ee)=>changeSelectValue(ee,index,e.source)} /> */}
          {filteredOptionsdesign(e,index)}
          </div>
          <div className="col-3 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
            <input name={e.source} type='number' className="mt-2 form-control mb-3 heading-input card-text heading-text" placeholder={"Amount of "+e.source} onChange={changeIncome} onFocus={(e)=>{
            if(e.target.value==="0"){
              e.target.value="";
            }
          }} value={e.income} />
          </div>
          <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded w-23">
            <input name={e.source} type='number' className="mt-2 form-control mb-3 heading-input pe-none card-text heading-text" placeholder="%" value={e.percent} />
          </div>
          <div className="col-1 mt-9 p-1 col-sm-4 col-md-2 m-1 rounded cursor-pointer  d-flex justify-content-center" onClick={()=>deleteSelectedSource(e.source,index)}>
          <i className="fa fa-trash-o"  style={{fontSize:"5vw",marginRight:"6px",marginTop:"10px"}} ></i>
          </div>
          {currentswipingrow === index && (
          <div className="delete-button">
  
          <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
          <path className="trash-lid" style={{transform : (Math.abs(animatecss) > 22 && Math.abs(animatecss) < 52) ? "translateY(-2px) rotate("+(Math.abs(animatecss)-18)+"deg)" : "transform: translateY(-2px) rotate(30deg)"}} fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
          <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
        </svg> 
        </div>
        )}
          {/* <div className="row-actions">
            <button onClick={() => handleSwipe(e.source)}>Delete</button>
          </div> */}
        </div>
        
      ))
      )  
      : <></>
    :
    <>{setselectedsource([])}</>}
      
      {
         <div id='newsource' className='row m-0 bg-grid swipe-list-item' 
         onTouchStart={(e)=>handleTouchStart(e,-1)}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         style={{
           transform: currentswipingrow===-1 ? 'translateX('+animatecss+'px)' : '',
           display: newsourcedisplay ? "flex" : "none"
         }}
         >
         <div className="col-4 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
         {/* <select value={newselectsource} className='form-select heading-input card-text heading-text' aria-label="Default select example" onChange={addNewSource}>
          <option value="">Select Source</option>
          {filteredOptionsdesign()}
        </select> */}
        {filteredOptionsdesign()}
        </div>
        <div className="col-3 m-0 p-1 col-sm-4 col-md-2 m-1 rounded">
        <input type='number' className="mt-2 form-control mb-3 heading-input card-text heading-text" placeholder="Amount" id='' />
        </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded w-23">
            <input type='number' className="mt-2 form-control mb-3 heading-input pe-none card-text heading-text" placeholder="%"  />
          </div>
        <div className="col-1 m-0 p-1 col-sm-4 col-md-2 m-1 rounded cursor-pointer  d-flex justify-content-center" onClick={async()=>{
          
          await document.getElementById("audioPlayer").play();
            setTimeout(() => {
            setcurrentswipingrow(-1);
            setanimatecss(-450);
            setTimeout(() => {
              document.getElementById("newsource").classList = "row m-0 bg-grid swipe-list-item";
              setnewsourcedisplay(false);
            }, 150);
          }, 60);

        }}>
          <i className="fa fa-trash-o" style={{fontSize:"5vw",marginRight:"6px",marginTop:"10px"}}></i>
          </div>
          <div className="delete-button">
  
          <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
          <path className="trash-lid" style={{transform : (Math.abs(animatecss) > 22 && Math.abs(animatecss) < 52) ? "translateY(-2px) rotate("+(Math.abs(animatecss)-18)+"deg)" : "transform: translateY(-2px) rotate(30deg)"}} fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
          <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
        </svg> 
        </div>
        </div>

      }
        <u className='text-primary heading-text' id='addnewsource' onClick={()=>{
            document.getElementById("newsource").classList = "row m-0 bg-grid swipe-list-item move";
            document.getElementById("newsource").style.display = "flex";
            document.getElementById("root").style.position = "fixed";
            setanimatecss(0);
            setnewsourcedisplay(true);
            setcount(1);

          }}>+ Add New Type</u>
          <br /><br />
    </div>
  )
}

export default Sourceofincome;