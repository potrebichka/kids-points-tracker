import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

const SelectRewardConfirmation = (props) => {
    return (
        <Modal show onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Select Reward Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Are you sure that you want to select Reward</h3>
                <h4>Name: {props.name}</h4>
                <h4>Points: {props.points}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" type="button" onClick={() => {props.onHide(); props.onRewardSelection(false);}}>Yes</Button>
                <Button variant="info" type="button" onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

SelectRewardConfirmation.propTypes = {
    name: PropTypes.string,
    onHide: PropTypes.func,
    onRewardSelection: PropTypes.func
}

export default SelectRewardConfirmation;