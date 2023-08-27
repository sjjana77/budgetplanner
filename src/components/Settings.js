import React, {useContext, useState} from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const Settings = () =>{
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [settingstmpvalue,setsettingstmpvalue] = useState({
        fontcolor: budget_details.fontcolor,
        fontsize: budget_details.fontsize,
        feedback:'',
        expense:'',
        savings:'',
        source:''
    });
    const changehandler = () =>{

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
            </div>
            <div className='row'>
                <div className='col'>
                    Font Size
                </div>
                <div className='col'>
                    <input className='form-control' onChange={(e)=>setbudget_details({...budget_details,fontsize:e.target.value})} value={budget_details.fontsize} type="number" min='12' max='60' name='fontsize' placeholder="Size" />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Feedback
                </div>
                <div className='col'>
                    <textarea className='form-control' onChange={changehandler} placeholder='Feedback'></textarea>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Add Expense
                </div>
                <div className='col'>
                <input className='form-control' onChange={changehandler} type="text" placeholder="Expense" />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Add Saving
                </div>
                <div className='col'>
                <input className='form-control' onChange={changehandler} type="text" placeholder="Saving" />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    Add Income Source
                </div>
                <div className='col'>
                <input className='form-control' onChange={changehandler} type="text" placeholder="Income Source" />
                </div>
            </div>
        </div>
    )
}

export default Settings;