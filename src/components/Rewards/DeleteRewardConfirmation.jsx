import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

const DeleteRewardConfirmation = (props) => {
    return (
        <Modal show onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Reward Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Are you sure that you want to delete Reward {props.name} ?</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" type="button" onClick={() => {props.onHide(); props.onRewardDeletion();}}>Yes</Button>
                <Button variant="info" type="button" onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

DeleteRewardConfirmation.propTypes = {
    name: PropTypes.string,
    onHide: PropTypes.func,
    onRewardDeletion: PropTypes.func
}

export default DeleteRewardConfirmation;