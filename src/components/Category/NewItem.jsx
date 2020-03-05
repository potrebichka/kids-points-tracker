import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Modal, Form, Button} from 'react-bootstrap';

const NewItem = (props) => {

    let _name = null;
    let _points = null;
    

    const handleNewItemFormSubmission = (event)  => {
        event.preventDefault();
        props.onNewItemCreation({name: _name.value, points: _points.value});
        _name.value = '';
        _points.value = '';
        props.onHide();
    }

    return (
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleNewItemFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a name of item:</Form.Label>
                        <Form.Control 
                            type="text"
                            id="name"
                            placeholder="Name of category" 
                            ref={(input) => {_name = input;}}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a number of points for item</Form.Label>
                        <Form.Control 
                            type="number"
                            id="points"
                            placeholder="0" 
                            ref={(input) => {_points = input;}}>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" type="submit">Add</Button>
                    <Button variant="danger" type="button" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

NewItem.propTypes = {
    onNewItemCreation: PropTypes.func
}

export default NewItem;