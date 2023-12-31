import React, {useContext, useState} from 'react';
import { UserContext } from '../UserContext';
import { Button, Modal } from 'react-bootstrap';
import delete_music from './delete_music.mp3';
// import React, {useContext, useEffect, useState} from 'react';

function MyModal({ show, onClose, content, deleteitemvalue, settingstmpvalue, setsuggestions_source, setsuggestions_expense, setsuggestions_saving, setsettingstmpvalue }) {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const [check,setcheck] = useState(false);
    const usercss = {
        fontSize: `${budget_details.fontsize}px`,
        color: `${budget_details.fontcolor}`,
      };
      const deleteitem = async (type,value) =>{
        let cc,index;
        // if(check === true){
        //     // let c = {...budget_details};
        //     // c.askdelete = 'no';
        //     // console.log(c);
        //     // setbudget_details(c);
        //     setbudget_details((prevBudgetDetails) => {
        //       const updatedBudgetDetails = { ...prevBudgetDetails, askdelete: 'no' };
        //       return updatedBudgetDetails;
        //     });
        // }
        if(type === "source"){
            await document.getElementById("audioPlayer").play();
            cc = {...budget_details};
            cc = cc.source_options;
            index = cc.indexOf(value);
            cc.splice(index,1);
            if(check === true){
              setbudget_details({...budget_details, source_options:cc, askdelete: 'no'});
            }
            else{
              setbudget_details({...budget_details, source_options:cc});
            }
            setTimeout(() => {
              setsuggestions_source([]);
              setsettingstmpvalue({...settingstmpvalue,source:''});
            }, 60);
            
        }
        else if(type === 'expenses'){
            await document.getElementById("audioPlayer").play();
            cc = [...budget_details.budget_options];
            const matchingEntries = cc.filter(option => (
              option.type === 'E' && option.category === value
            ));
            if (matchingEntries.length > 0) {
              index = cc.indexOf(matchingEntries[0]);
            }
            cc.splice(index,1);
            if(check === true){
              setbudget_details({...budget_details, budget_options:cc, askdelete: 'no'});
            }
            else{
              setbudget_details({...budget_details, budget_options:cc});
            }
            setTimeout(() => {
              setsuggestions_expense([]);
              setsettingstmpvalue({...settingstmpvalue,expenses:''});
            }, 60);

        }
        else{
            await document.getElementById("audioPlayer").play();
            cc = [...budget_details.budget_options];
            const matchingEntries = cc.filter(option => (
              option.type === 'S' && option.category === value
            ));
            if (matchingEntries.length > 0) {
              index = cc.indexOf(matchingEntries[0]);
            }
            cc.splice(index,1);
            if(check === true){
              setbudget_details({...budget_details, budget_options:cc, askdelete: 'no'});
            }
            else{
              setbudget_details({...budget_details, budget_options:cc});
            }
            setTimeout(() => {
              setsuggestions_saving([]);
              setsettingstmpvalue({...settingstmpvalue,saving:''});
            }, 60);

        }
        onClose();
      }
      const deletebtn = () =>{
        return (
            <div>
            <input type='checkbox' checked={check} onChange={()=>setcheck(!(check))} />&nbsp;
            Don't Ask Again<br />
            <button onClick={()=>deleteitem(deleteitemvalue.type,deleteitemvalue.value)} className='btn btn-primary asktodeletebtn'>Yes</button>
            <button onClick={onClose} className='btn btn-primary asktodeletebtn'>No</button>
            </div>
        )
      }
      const closebtn = () => {
        return (
        <Button className='d-flex justify-content-center' style={{margin: "auto"}} variant="primary" onClick={onClose}>
            Close
        </Button>
        )
      }
    return (
        <Modal className='d-flex justify-content-center modall' centered show={show} onHide={onClose} style={usercss}>
        <audio id="audioPlayer" style={{display:"none"}} controls>
        <source src={delete_music} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <Modal.Body style={{background: "#b0d3e1"}}>
            <p className='d-flex justify-content-center'>{content}</p>
        {content.search("Are you sure you want to") !== -1    ?
            deletebtn()
            :
            closebtn()
        }
        
        </Modal.Body>
        </Modal>
    );
    }

export default MyModal;
