import React, {useContext} from 'react';
import { UserContext } from '../UserContext';
import { Button, Modal } from 'react-bootstrap';
// import React, {useContext, useEffect, useState} from 'react';

function MyModal({ show, onClose, content }) {
    const { budget_details, setbudget_details } = useContext(UserContext);
    const usercss = {
        fontSize: `${budget_details.fontsize}px`,
        color: `${budget_details.fontcolor}`,
      };
    return (
        <Modal className='d-flex justify-content-center' centered show={show} onHide={onClose} style={usercss}>
        
        <Modal.Body style={{background: "#b0d3e1"}}>
            <p className='d-flex justify-content-center'>{content}</p>
            
        <Button className='d-flex justify-content-center' style={{margin: "auto"}} variant="primary" onClick={onClose}>
            Close
        </Button>
        </Modal.Body>
        </Modal>
    );
    }

export default MyModal;
