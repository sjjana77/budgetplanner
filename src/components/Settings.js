import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import MyModal from './MyModal';

const Settings = ({ convertToMonthYear }) =>{
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [settingstmpvalue,setsettingstmpvalue] = useState({
        feedback:'',
        expense:'',
        saving:'',
        source:'' 
    }); 
    const [showModal, setShowModal] = useState(false);
    const [modalcontent,setmodalcontent] = useState('');

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [suggestions_source, setsuggestions_source] = useState([]);
    const [suggestions_saving, setsuggestions_saving] = useState([]);
    const [suggestions_expense, setsuggestions_expense] = useState([]);
    const addsettings = (type) =>{
        if(type === "source"){
            const lowerCaseSourceOptions = budget_details.source_options.map(source => source.toLowerCase());
            if(lowerCaseSourceOptions.includes(settingstmpvalue.source.toLowerCase().trim())){
              setmodalcontent('Source Already Present');
              handleOpenModal();
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
              setmodalcontent('Savings Already Present');
              handleOpenModal();
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
                setmodalcontent('Expense Already Present');
                handleOpenModal();
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
        let matchingSuggestions = [];
        if(e.target.value !== ""){
            if(e.target.name === "source"){
                matchingSuggestions = budget_details.source_options.filter(item =>
                item.toLowerCase().includes(e.target.value.toLowerCase()));
                setsuggestions_source(matchingSuggestions);
                setsuggestions_expense([]);
                setsuggestions_saving([]);
            }
            else if(e.target.name === "expense"){
                matchingSuggestions = budget_details.budget_options.filter(item => item.type === 'E')
                .filter(item => item.category.toLowerCase().includes(e.target.value.toLowerCase()))
                .map(item => item.category);
                setsuggestions_expense(matchingSuggestions);
                setsuggestions_source([]);
                setsuggestions_saving([]);
            }
            else if(e.target.name === "saving"){
                matchingSuggestions = budget_details.budget_options.filter(item => item.type === 'S')
                .filter(item => item.category.toLowerCase().includes(e.target.value.toLowerCase()))
                .map(item => item.category);
                setsuggestions_saving(matchingSuggestions);
                setsuggestions_source([]);
                setsuggestions_expense([]);
            }
        }
        else{
            setsuggestions_source([]);
            setsuggestions_expense([]);
            setsuggestions_saving([]);
        }

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
      useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.suggestions-modal') && !event.target.closest('.form-control')) {
                setIsDropdownOpen(false);
                setsuggestions_source([]);
                setsuggestions_expense([]);
                setsuggestions_saving([]);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        addsettings(event.target.name);
      }
    };
    return(
        <div className='settings container mt-4' style={usercss}>
        <div className='row mt-2'>
            <div className='col'>
            <h3 className=''>Settings</h3>
            </div>
            <div className='col'>
            <span className='show_month'>{convertToMonthYear(budget_details.selectedmonth)}</span>
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
                    <textarea onKeyDown={handleKeyDown} className='form-control' name='feedback' value={settingstmpvalue.feedback} id='feedback' onChange={changehandler} placeholder='Feedback'></textarea>
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
                <input onKeyDown={handleKeyDown} className='form-control' onFocus={() => setIsDropdownOpen(true)} value={settingstmpvalue.expense} id='expense' name='expense' onChange={changehandler} type="text" placeholder="Expense" />
                {isDropdownOpen && (
                <div className="suggestions-modal">
                    <div className='contentt'>
                  {suggestions_expense.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                    >
                      {item}
                    </div>
                  ))}
                </div></div>
                )}
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
                <input onKeyDown={handleKeyDown} className='form-control' onFocus={() => setIsDropdownOpen(true)} value={settingstmpvalue.saving} id='saving' name='saving' onChange={changehandler} type="text" placeholder="Saving" />
                {isDropdownOpen && (
                <div className="suggestions-modal">
                    <div className='contentt'>
                  {suggestions_saving.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                    >
                      {item}
                    </div>
                  ))}
                  </div>
                </div>
                )}
                {/* {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((item, index) => (
            <div key={index} className="suggestion-item">
              {item}
            </div>
          ))}
        </div>
      )} */}
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
                <input onKeyDown={handleKeyDown} className='form-control' onFocus={() => setIsDropdownOpen(true)} value={settingstmpvalue.source} id='source' name='source' onChange={changehandler} type="text" placeholder="Income Source" />
                {isDropdownOpen && (
                <div className="suggestions-modal">
                    <div className='contentt'>
                  {suggestions_source.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                    >
                      {item}
                    </div>
                  ))}
                </div></div>
                )}
                </div>
                <div className='col source_col'>
                {renderAddButton('source')}
                </div>
            </div>
            
            <MyModal show={showModal} content={modalcontent} onClose={handleCloseModal} />

        </div>
    )
}

export default Settings;