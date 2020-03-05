import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Modal, Form, Button} from 'react-bootstrap';

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toList: false}
        this._name = null;
        this._points = null;
    }

    handleNewItemFormSubmission = (event)  => {
        event.preventDefault();
        this.props.onNewItemCreation({name: this._name.value, points: this._points.value});
        this._name.value = '';
        this._points.value = '';
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
                <Form onSubmit={this.handleNewItemFormSubmission}>
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
                                ref={(input) => {this._name = input;}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="control-label">Enter a number of points for item</Form.Label>
                            <Form.Control 
                                type="number"
                                id="points"
                                placeholder="0" 
                                ref={(input) => {this._points = input;}}>
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

NewItem.propTypes = {
    onNewItemCreation: PropTypes.func
}

export default NewItem;