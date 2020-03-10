import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddReward = (props) => {

    let _name = null;
    let _points = null;

    const handleAddRewardFormSubmission = (event)  => {
        event.preventDefault();
        props.onRewardCreation({name: _name.value, points: parseInt(_points.value)});
        _name.value = '';
        _points.value = null;
        props.onHide();
    }
    return (
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleAddRewardFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>Add reward</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a name of reward:</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            placeholder="Reward name"
                            ref={(input) => {_name = input;}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a number of points per reward:</Form.Label>
                        <Form.Control
                            type="number"
                            id="points"
                            placeholder="0"
                            ref={(input) => {_points = input;}}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">Add</Button>
                    <Button variant="default" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

AddReward.propTypes = {
    onRewardCreation: PropTypes.func,
    onHide: PropTypes.func
}

export default AddReward;