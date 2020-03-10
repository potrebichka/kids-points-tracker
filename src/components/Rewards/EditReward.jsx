import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Button} from 'react-bootstrap';

const EditReward = (props) => {
    let _name = null;
    let _points = null;

    const handleEditFormSubmission = (event) => {
        event.preventDefault();
        props.onRewardUpdate({name: _name.value, points: _points.value, id: props.id});
        _name.value = '';
        _points.value = null;
        props.onHide();
    }

    return(
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleEditFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Reward
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a name of reward:</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            placeholder={props.name}
                            ref={(input) => {_name = input;}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a number of points per reward:</Form.Label>
                        <Form.Control
                            type="number"
                            id="points"
                            placeholder={props.points}
                            ref={(input) => {_points = input;}}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">Edit</Button>
                    <Button variant="default" type="button" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

EditReward.propTypes = {
    name: PropTypes.string,
    points: PropTypes.number,
    onRewardUpdate: PropTypes.func,
    onHide: PropTypes.func
}

export default EditReward;