import React, {useState } from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import EditChild from './Children/EditChild';
import DeleteChildConfirmation from './Children/DeleteChildConfirmation';
import {Link} from 'react-router-dom';

const Child = (props) => {

    const [showInfo, setShowInfo] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);


    const handleShowInfo = () => setShowInfo(true);

    const handleShowEditForm = () => {setShowInfo(false); setShowEditForm(true);}

    const handleChildEdition = (updatedChild) => {
        updatedChild.id = props.id;
        props.onChildEdition(updatedChild);

        setShowInfo(true);
        setShowEditForm(false);
    }

    const handleHideEditForm = () => setShowEditForm(false);

    const handleChildDeletion = () => {
        setShowDeleteForm(false);
        props.onDeleteClick();
    }


    let yearDifference = Moment(new Date()).diff(Moment(props.birthday), 'years');
    const name = showInfo ? "Hide Info" : "Show Info";
    return (
        <div>
            <h3><Link to={"children/" + props.id}>{props.name}</Link> </h3>
            <button type="button" className="btn btn-primary" onClick={handleShowInfo}>{name}</button>
            <hr/>
            {showInfo ? 
                <div>
                    <h2>Child information</h2>
                    <p>Name: {props.name}</p>
                    <p>Birthday: {props.birthday}</p>
                    <p>Your child is {yearDifference} years old.</p>
                    <p>Points: {props.points}</p>
                    <button type="button" className="btn btn-success" onClick={handleShowEditForm}>Edit Child</button>
                    <button type="button" className="btn btn-danger"  onClick={setShowDeleteForm(true)}>Delete Child</button>
                    <hr/>
                </div>
                : null
            }
            {showEditForm ? 
                <EditChild id={props.id} name={props.name} birthday={props.birthday} onChildEdition={handleChildEdition} onHide={handleHideEditForm}/>
            : null
            }
            {showDeleteForm ? 
                <DeleteChildConfirmation onChildDeletion={handleChildDeletion} onHide={setShowDeleteForm(false)} name={props.name}/>
                : null
            }
        </div>
    );
    
}

Child.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    onChildEdition: PropTypes.func,
    onDeleteClick: PropTypes.func
}

export default Child;