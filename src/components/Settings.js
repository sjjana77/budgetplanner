import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const Settings = () =>{
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [settingstmpvalue,setsettingstmpvalue] = useState({
        feedback:'',
        expense:'',
        saving:'',
        source:'' 
    }); 
    const addsettings = (type) =>{
        if(type === "source"){
            const lowerCaseSourceOptions = budget_details.source_options.map(source => source.toLowerCase());
            if(lowerCaseSourceOptions.includes(settingstmpvalue.source.toLowerCase().trim())){
                alert("Source already Present");
            }
            else{
                let tmp = budget_details.source_options;
                tmp.push(settingstmpvalue.source.trim());
                setbudget_details({...budget_details,source_options:tmp});
            }
            setsettingstmpvalue({...settingstmpvalue, source:''});
        }
        if(type === "saving"){
            const lowerCaseSourceOptions = budget_details.budget_options.filter(option => option.type === 'S') 
                                           .map(option => option.category.toLowerCase());
            if(lowerCaseSourceOptions.includes(settingstmpvalue.saving.toLowerCase().trim())){
                alert("Savings Type already Present");
            }
            else{
                let tmp = budget_details.budget_options;
                tmp.push({type:'S',category: settingstmpvalue.saving.trim()});
                setbudget_details({...budget_details,budget_options:tmp});
            }
            setsettingstmpvalue({...settingstmpvalue, saving:''});
        }
        if(type === "expense"){
            const lowerCaseSourceOptions = budget_details.budget_options.filter(option => option.type === 'E') 
                                           .map(option => option.category.toLowerCase());
            if(lowerCaseSourceOptions.includes(settingstmpvalue.expense.toLowerCase().trim())){
                alert("Expense already Present");
            }
            else{
                let tmp = budget_details.budget_options;
                tmp.push({type:'E',category: settingstmpvalue.expense.trim()});
                setbudget_details({...budget_details,budget_options:tmp});
            }
            setsettingstmpvalue({...settingstmpvalue, expense:''});
        }
    }
    const renderAddButton = (type) => {
        if (settingstmpvalue[type]) {
          return (
            <button className="btn btn-primary" onClick={() => addsettings(type)}>
              Add
            </button>
          );
        }
        return null;
    };
    const changehandler = (e) =>{
        setsettingstmpvalue({...settingstmpvalue,[e.target.name]:e.target.value});
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
    return(
        <div className='settings container mt-4' style={usercss}>
        <div className='row mt-2'>
            <div className='col'>
            <h3 className=''>Settings</h3>
            </div>
            <div className='col'>
            <Link to="/" className="fa fa-arrow-circle-left  dashboard-icon cursor-pointer"></Link>
            </div>
        </div>
            <div className='row'>
                <div className='col'>
                    Font Color
                </div>
                <div className='col'>
                <input className='form-control' onChange={(e)=>setbudget_details({...budget_details,fontcolor:e.target.value})} value={budget_details.fontcolor} type="color" id="colorPicker" name="fontcolor" />
                </div>
                <div className='col'>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Font Size
                </div>
                <div className='col'>
                    <input className='form-control' onChange={(e)=>setbudget_details({...budget_details,fontsize:e.target.value})} value={parseInt(budget_details.fontsize)} type="number" min='12' max='60' name='fontsize' placeholder="Size" />
                </div>
                <div className='col'>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Feedback
                </div>
                <div className='col'>
                    <textarea className='form-control' name='feedback' value={settingstmpvalue.feedback} id='feedback' onChange={changehandler} placeholder='Feedback'></textarea>
                </div>
                <div className='col feedback_col'>
                {renderAddButton('feedback')}
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Add Expense
                </div>
                <div className='col'>
                <input className='form-control' value={settingstmpvalue.expense} id='expense' name='expense' onChange={changehandler} type="text" placeholder="Expense" />
                </div>
                <div className='col expense_col'>
                {renderAddButton('expense')}
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Add Saving
                </div>
                <div className='col'>
                <input className='form-control' value={settingstmpvalue.saving} id='saving' name='saving' onChange={changehandler} type="text" placeholder="Saving" />
                </div>
                <div className='col saving_col'>
                {renderAddButton('saving')}
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Add Income Source
                </div>
                <div className='col'>
                <input className='form-control' value={settingstmpvalue.source} id='source' name='source' onChange={changehandler} type="text" placeholder="Income Source" />
                </div>
                <div className='col source_col'>
                {renderAddButton('source')}
                </div>
            </div>
        </div>
    )
}

export default Settings;