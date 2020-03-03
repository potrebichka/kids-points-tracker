import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {withFirebase} from '../Firebase';
import { RegisterLink } from '../Register';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                console.log('Success');
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
        const {email, password,error} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <Form onSubmit={this.onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterLink onRegisterLink={this.props.onRegisterLink}/>
                    {error && <p className="error-message">{error.message}</p>}
                    <Form.Group controlId="loginEmail">
                        <Form.Label className="control-label">Email:</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="loginPassword">
                        <Form.Label className="control-label">Password:</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={this.onChange}></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={this.props.onCloseLogin}>Close</Button>
                    <Button variant="primary" type="submit" disabled={isInvalid}>Login</Button>
                </Modal.Footer>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    onCloseLogin: PropTypes.func,
    onRegisterLink: PropTypes.func,
    onAuthSuccess: PropTypes.func
}

const LoginPage = withFirebase(LoginForm);

export default LoginPage;

export {LoginForm};