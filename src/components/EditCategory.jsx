import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

const EditCategory = (props) => {
    let _name = null;

    function handleEditCategoryFormSubmission (event) {
        event.preventDefault();
        props.onCategoryEdition({name: _name.value});
        _name.value = '';
    }

    return (
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleEditCategoryFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">Edit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

EditCategory.propTypes = {
    name: PropTypes.string,
    birthday: PropTypes.string,
    onCategoryEdition: PropTypes.func,
    onHide: PropTypes.func
}

export default EditCategory;