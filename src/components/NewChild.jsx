import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Modal, Form, Button} from 'react-bootstrap';

class NewChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toList: false, close: false}
        this._name = null;
        this._birthday = null;
        
    }

    handleNewChildFormSubmission = (event)  => {
        event.preventDefault();
        this.props.onNewChildCreation({name: this._name.value, birthday: this._birthday.value});
        this._name.value = '';
        this._birthday.value = null;
        this.setState({toList: true})
    }

    handleClose = () => {
        this.setState({close: true});
    }

    render() 
    {
        if (this.state.toList || this.state.close) {
            return <Redirect to="/children"/>
        } 
        return (
            <Modal show onHide={this.handleClose}>
                <Form onSubmit={this.handleNewChildFormSubmission}>
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
                                ref={(input) => {this._name = input;}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="control-label">Enter birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                id="birthday"
                                className="form-control"
                                ref={(input) => {this._birthday = input;}}>
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

NewChild.propTypes = {
    onNewChildCreation: PropTypes.func
}

export default NewChild;