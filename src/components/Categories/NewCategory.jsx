import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Button} from 'react-bootstrap';

const NewCategory = (props) => {
    let _name = null;

    const handleNewCategoryFormSubmission = (event)  => {
        event.preventDefault();
        props.onNewCategoryCreation({name: _name.value, items: {}});
        _name.value = '';
    }

    return (
        <Modal show onHide={props.onHide}>
            <Form onSubmit={handleNewCategoryFormSubmission}>
                <Modal.Header closeButton>
                    <Modal.Title>New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="control-label">Enter a name of category:</Form.Label>
                        <Form.Control 
                            type="text"
                            id="category"
                            placeholder="Name of category" 
                            ref={(input) => {_name = input;}}>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" type="submit">Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

NewCategory.propTypes = {
    onNewCategoryCreation: PropTypes.func
}

export default NewCategory;