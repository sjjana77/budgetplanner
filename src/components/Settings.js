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
    const [deleteitemvalue,setdeleteitemvalue] = useState({
      type:'',
      value:''
    });

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
          if(settingstmpvalue.source !== ""){
            const lowerCaseSourceOptions = budget_details.source_options.map(source => source.toLowerCase());
            if(lowerCaseSourceOptions.includes(settingstmpvalue.source.toLowerCase().trim())){
              setmodalcontent(`${settingstmpvalue.source} Already Present in Source`);
              handleOpenModal();
            }
            else{
                let tmp = budget_details.source_options;
                tmp.push(settingstmpvalue.source.trim());
                setbudget_details({...budget_details,source_options:tmp});
            }
            setsettingstmpvalue({...settingstmpvalue, source:''});
          }
        }
        if(type === "saving"){
          if(settingstmpvalue.saving !== ""){
            const lowerCaseSourceOptions = budget_details.budget_options.filter(option => option.type === 'S') 
                                           .map(option => option.category.toLowerCase());
            if(lowerCaseSourceOptions.includes(settingstmpvalue.saving.toLowerCase().trim())){
              setmodalcontent(`${settingstmpvalue.saving} Already Present in Savings`);
              handleOpenModal();
            }
            else{
                let tmp = budget_details.budget_options;
                tmp.push({type:'S',category: settingstmpvalue.saving.trim()});
                setbudget_details({...budget_details,budget_options:tmp});
            }
            setsettingstmpvalue({...settingstmpvalue, saving:''});
            }
          }
        if(type === "expense"){
          if(settingstmpvalue.expense !== ""){
            const lowerCaseSourceOptions = budget_details.budget_options.filter(option => option.type === 'E') 
                                           .map(option => option.category.toLowerCase());
            if(lowerCaseSourceOptions.includes(settingstmpvalue.expense.toLowerCase().trim())){
                setmodalcontent(`${settingstmpvalue.expense} Already Present in Expenses`);
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

    const deleteitem= (type,value) =>{
      let count,cc,index;
      if(type === "source"){
        count = getCount(value, budget_details.source_count);
        if(count > 0){
          setmodalcontent(`${value} has values in Sources, if you want to delete, first delete ${value} in source and try again`);
          handleOpenModal();
        }
        else{
          if(budget_details.askdelete === "yes"){
          setmodalcontent(`Are you sure you want to delete`);
          setdeleteitemvalue({type:type,value:value});
          handleOpenModal();
          }
          else{
          cc = {...budget_details};
          cc = cc.source_options;
          index = cc.indexOf(value);
          cc.splice(index,1);
          setbudget_details({...budget_details, source_options:cc});
          }

        }
        setsettingstmpvalue({...settingstmpvalue,source:''});
        setsuggestions_source([]);
      }
      else if(type === 'expenses'){
        count = getCount(value, budget_details.expenses_count);
        if(count > 0){
          setmodalcontent(`${value} has values in Expenses, if you want to delete, first delete ${value} in expense and try again`);
          handleOpenModal();
        }
        else{
          if(budget_details.askdelete === "yes"){
            setmodalcontent(`Are you sure you want to delete`);
            setdeleteitemvalue({type:type,value:value});
            handleOpenModal();
          }
          else{
            cc = [...budget_details.budget_options];
            const matchingEntries = cc.filter(option => (
              option.type === 'E' && option.category === value
            ));
            if (matchingEntries.length > 0) {
              index = cc.indexOf(matchingEntries[0]);
            }
            cc.splice(index,1);
            setbudget_details({...budget_details, budget_options:cc});
          }
          setsettingstmpvalue({...settingstmpvalue,expense:''});
          setsuggestions_expense([]);
          }
      }
      else{
        count = getCount(value, budget_details.savings_count);
        if(count > 0){
          setmodalcontent(`${value} has values in Savings, if you want to delete, first delete ${value} in saving and try again`);
          handleOpenModal();
        }
        else{
          if(budget_details.askdelete === "yes"){
            setmodalcontent(`Are you sure you want to delete`);
            setdeleteitemvalue({type:type,value:value});
            handleOpenModal();
          }
          else{
            cc = [...budget_details.budget_options];
            const matchingEntries = cc.filter(option => (
              option.type === 'S' && option.category === value
            ));
            if (matchingEntries.length > 0) {
              index = cc.indexOf(matchingEntries[0]);
            }
            cc.splice(index,1);
            setbudget_details({...budget_details, budget_options:cc});
          }
        }
        setsettingstmpvalue({...settingstmpvalue,saving:''});
        setsuggestions_saving([]);
      }
    }
    function getCount(value, dataList) {
      for (let i = 0; i < dataList.length; i++) {
          if (dataList[i].name === value) {
              return dataList[i].count;
          }
      }
      return 0; 
    }
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
                <input onKeyDown={handleKeyDown} className='form-control' onFocus={() => {setIsDropdownOpen(true);setsuggestions_source([]);setsuggestions_saving([]);}} value={settingstmpvalue.expense} id='expense' name='expense' onChange={changehandler} type="text" placeholder="Expense" />
                {isDropdownOpen && (
                <div className="suggestions-modal">
                    <div className='contentt'>
                  {suggestions_expense.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                    >
                      {item}<span name='expense' onClick={()=>deleteitem('expenses',item)} className='close text-white'>x</span>
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
                <input onKeyDown={handleKeyDown} className='form-control' onFocus={() => {setIsDropdownOpen(true);setsuggestions_source([]);setsuggestions_expense([]);}} value={settingstmpvalue.saving} id='saving' name='saving' onChange={changehandler} type="text" placeholder="Saving" />
                {isDropdownOpen && (
                <div className="suggestions-modal">
                    <div className='contentt'>
                  {suggestions_saving.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                    >
                      {item}<span name='expense' onClick={()=>deleteitem('savings',item)} className='close text-white'>x</span>
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
                <input onKeyDown={handleKeyDown} className='form-control' onFocus={() => {setIsDropdownOpen(true);setsuggestions_expense([]);setsuggestions_saving([]);}} value={settingstmpvalue.source} id='source' name='source' onChange={changehandler} type="text" placeholder="Income Source" />
                {isDropdownOpen && (
                <div className="suggestions-modal">
                    <div className='contentt'>
                  {suggestions_source.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                    >
                      {item}<span name='expense' onClick={()=>deleteitem('source',item)} className='close text-white'>x</span>
                    </div>
                  ))}
                </div></div>
                )}
                </div>
                <div className='col source_col'>
                {renderAddButton('source')}
                </div>
            </div>
            
            <MyModal
            setsuggestions_source={setsuggestions_source}
            setsuggestions_expense={setsuggestions_expense}
            setsuggestions_saving={setsuggestions_saving}
            deleteitemvalue={deleteitemvalue} setsettingstmpvalue={setsettingstmpvalue} settingstmpvalue={settingstmpvalue} show={showModal} content={modalcontent} onClose={handleCloseModal} />

        </div>
    )
}

export default Settings;