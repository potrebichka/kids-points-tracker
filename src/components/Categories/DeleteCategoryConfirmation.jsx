import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteCategoryConfirmation = (props) => {
    return (
        <Modal show onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h3>Are you sure that you want to delete Category {props.name} ?</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" type="button" onClick={props.onCategoryDeletion}>Yes</Button>
                <Button variant="info" type="button" onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

DeleteCategoryConfirmation.propTypes = {
    onCategoryDeletion: PropTypes.func,
    name: PropTypes.string,
    onHide: PropTypes.func
}

export default DeleteCategoryConfirmation;