import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Modal, Form, Button} from 'react-bootstrap';

class NewCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toList: false}
        this._name = null;
        
    }

    handleNewCategoryFormSubmission = (event)  => {
        event.preventDefault();
        this.props.onNewCategoryCreation({name: this._name.value, items: {}});
        this._name.value = '';
        this.setState({toList: true})
    }

    handleClose = () => {
        this.setState({toList: true});
    }

    render() 
    {
        if (this.state.toList) {
            return <Redirect to="/categories"/>
        } 
        return (
            <Modal show onHide={this.handleClose}>
                <Form onSubmit={this.handleNewCategoryFormSubmission}>
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
                                ref={(input) => {this._name = input;}}>
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
}

NewCategory.propTypes = {
    onNewCategoryCreation: PropTypes.func
}

export default NewCategory;