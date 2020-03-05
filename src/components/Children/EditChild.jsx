import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Button} from 'react-bootstrap';

const EditChild = (props) => {
    let _name = null;
    let _birthday = null;

    function handleEditChildFormSubmission (event) {
        event.preventDefault();
        props.onChildEditing({name: _name.value, birthday: _birthday.value});
        _name.value = '';
        _birthday.value = null;
    }

    return (
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleEditChildFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Child</Modal.Title>
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
                        <Form.Label className="control-label">Enter birthday</Form.Label>
                        <Form.Control
                            type="date"
                            id="birthday"
                            defaultValue={props.birthday}
                            ref={(input) => {_birthday = input;}}>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">Edit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

EditChild.propTypes = {
    name: PropTypes.string,
    birthday: PropTypes.string,
    onChildEditing: PropTypes.func,
    onHide: PropTypes.func
}

export default EditChild;