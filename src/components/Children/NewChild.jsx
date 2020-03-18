import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Button} from 'react-bootstrap';

const NewChild = (props) => {
    let _name = null;
    let _birthday = null;

    const handleNewChildFormSubmission = (event)  => {
        event.preventDefault();
        props.onNewChildCreation({name: _name.value, birthday: _birthday.value});
        _name.value = '';
        _birthday.value = null;
        props.onHide();
    }

    return (
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleNewChildFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>New Child</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a name:</Form.Label>
                        <Form.Control 
                            type="text"
                            id="name"
                            placeholder="Name of child" 
                            ref={(input) => {_name = input;}}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="control-label">Enter birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            id="birthday"
                            className="form-control"
                            ref={(input) => {_birthday = input;}}>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" type="submit">Add</Button>
                    <Button variant="default" type="button" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

NewChild.propTypes = {
    onNewChildCreation: PropTypes.func,
    onHide: PropTypes.func
}

export default NewChild;