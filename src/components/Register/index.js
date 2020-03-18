import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {withFirebase} from '../Firebase';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {firstName, lastName, email, passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                this.setState({error});
            }).then(() => {
                if (!this.state.error) {
                    this.props.onAuthSuccess();
                }
            })
        
        event.preventDefault();
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    render() {
        const {
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            lastName === '' ||
            firstName === '';
        return (
            <Form onSubmit={this.onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p className="error-message">{error.message}</p>}
                    <Form.Group controlId="registerFirstName">
                        <Form.Label className="control-label">First Name:</Form.Label>
                        <Form.Control type="text" name="firstName" value={firstName} onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="registerLastName">
                        <Form.Label className="control-label">Last Name:</Form.Label>
                        <Form.Control type="text" name="lastName" value={lastName} onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="registerEmail">
                        <Form.Label className="control-label">Email:</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="registerPassword">
                        <Form.Label className="control-label">Password:</Form.Label>
                        <Form.Control type="password" name="passwordOne" value={passwordOne} onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="registerConformPassword">
                        <Form.Label className="control-label">Confirm Password:</Form.Label>
                        <Form.Control type="password" name="passwordTwo" value={passwordTwo} onChange={this.onChange}></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={this.props.onCloseRegister}>Close</Button>
                    <Button variant="primary" type="submit" disabled={isInvalid}>Register</Button>
                </Modal.Footer>
            </Form>
        );
    }
}

RegisterForm.propTypes = {
    onCloseRegister: PropTypes.func,
    onAuthSuccess: PropTypes.func
}

const RegisterPage = withFirebase(RegisterForm);

const RegisterLink = (props) => (
    <p>Dont' have an account? <a href="#" onClick={props.onRegisterLink}>Register!</a></p>
)

RegisterLink.propTypes = {
    onRegisterLink: PropTypes.func
}

export default RegisterPage;

export {RegisterForm, RegisterLink};
