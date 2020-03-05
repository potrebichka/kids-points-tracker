import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import EditItem from './EditItem';
import DeleteItemConfirmation from './DeleteItemConfirmation';

const ItemControl = (props) => {

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowEditForm = () => setShowEdit(true);
    const handleHideEditForm = () => setShowEdit(false);

    const handleShowDeleteForm = () => setShowDelete(true);
    const handleHideDeleteForm = () => setShowDelete(false);

    const handleItemEdition = (updatedItem) => {
        updatedItem.id = props.id;
        props.onItemEdition(updatedItem);
        handleHideEditForm();
    }

    const handleItemDeletion = () => {
        props.onItemDeletion();
        handleHideDeleteForm();
    }

    return (
        <div>
            <h3>Item Name: {props.name}</h3>
            <h4>Points for Item: {props.points}</h4>
            <Button type="button" variant="success" onClick={handleShowEditForm}>Edit Item</Button>
            <Button type="button" variant="danger" onClick={handleShowDeleteForm}>Delete Item</Button>
            <hr/>
            {showEdit ? 
                <EditItem name={props.name} points={props.points} onHide={handleHideEditForm} onItemEdition={handleItemEdition}/>
                : null
            }
            {showDelete ? 
                <DeleteItemConfirmation onHide={handleHideDeleteForm} name={props.name} onItemDeletion={handleItemDeletion}/>
                : null
            }
        </div>
    );
}

ItemControl.propTypes = {
    name: PropTypes.string,
    points: PropTypes.number,
    onItemEdition: PropTypes.func,
    onItemDeletion: PropTypes.func
}

export default ItemControl;