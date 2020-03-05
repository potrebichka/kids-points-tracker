import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditItem = (props) => {
    let _name = null;
    let _points = null;

    function handleEditItemFormSubmission (event) {
        event.preventDefault();
        props.onItemEdition({name: _name.value, points: parseInt(_points.value)});
        _name.value = '';
        _points.value = '';
    }

    return (
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleEditItemFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a name:</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            placeholder={props.name} 
                            defaultValue={props.name}
                            ref={(input) => {_name = input;}}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a number of points for item:</Form.Label>
                        <Form.Control
                            type="number"
                            id="points"
                            placeholder={props.points} 
                            defaultValue={props.points}
                            ref={(input) => {_points = input;}}>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">Edit</Button>
                    <Button variant="danger" type="button" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

EditItem.propTypes = {
    name: PropTypes.string,
    birthday: PropTypes.string,
    onItemEdition: PropTypes.func,
    onHide: PropTypes.func
}

export default EditItem;