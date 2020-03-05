import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteChildConfirmation = (props) => {
    return (
        <Modal show onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h3>Are you sure that you want to delete Child {props.name} ?</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" type="button" onClick={props.onChildDeletion}>Yes</Button>
                <Button variant="info" type="button" onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

DeleteChildConfirmation.propTypes = {
    onChildDeletion: PropTypes.func,
    name: PropTypes.string,
    onHide: PropTypes.func
}

export default DeleteChildConfirmation;