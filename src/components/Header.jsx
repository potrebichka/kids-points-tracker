import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';
import RegisterPage from './Register';
// import {FirebaseContext} from './Firebase';

const Header = (props) => {

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleCloseRegister = () => {setShowRegister(false); setShowMessage(false)}
    const handleShowRegister = () => setShowRegister(true);

    const handleCloseLogin = () => {setShowLogin(false); setShowMessage(false)}
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseMessage = () => setShowMessage(false);
    const handleShowMessage = () => setShowMessage(true);

    const handleSubmitRegister = () => {
        console.log('Submit');
    }

    const handleSubmitLogin = () => {
        console.log('Login');
        handleShowMessage();
    }

    {/* <h1>Kids Points Tracker</h1>
    <Link to="/">Home</Link> | <Link to="/account">Create new post</Link> */}
    let classAuth ="auth";
    if (props.auth) {
        classAuth += " auth-true";
    } else {
        classAuth += " auth-false";
    }
    return (
        <div className="container">
            <div className={classAuth}>
                <header className="clearfix">
                    <div className="userAuth unauthenticated pull-right">
                        <Link to="/"><button type="button" className="btn btn-secondary">Home</button></Link>
                        <Button variant="primary" onClick={handleShowRegister}>Register</Button>
                        <Button variant="success" onClick={handleShowLogin}>Login</Button>
                        {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#registerModal">Register</button>
                        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#loginModal">Login</button> */}
                    </div>
                    <div className="userAuth authenticated pull-right">
                        <span className="user-info">
                            <span className="user-name"></span>
                        </span>
                        {/* <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#savedListModal">Your Children</button> */}
                        <Link to="/"><button type="button" className="btn btn-secondary">Home</button></Link>
                        <Link to="/children"><Button variant="secondary">Your Children</Button></Link>
                        <Link to="/categories"><Button variant="secondary">Your Categories</Button></Link>
                        <Button variant="success">Logout</Button>
                        {/* <button type="button" className="btn btn-success" id="logout">Logout</button> */}
                    </div>
                </header>
                <hr/>
                <Modal show={showRegister} onHide={handleCloseRegister}>
                    {/* <FirebaseContext.Consumer>
                        {firebase => <RegisterForm firebase={firebase} onCloseRegister={handleCloseRegister}/>}
                    </FirebaseContext.Consumer> */}
                        <RegisterPage  onCloseRegister={handleCloseRegister}/>
                    
                    {/* <Form onSubmit={handleSubmitRegister}>
                        <Modal.Header closeButton>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="registerFirstName">
                                <Form.Label className="control-label">First Name:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="registerLastName">
                                <Form.Label className="control-label">Last Name:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="registerEmail">
                                <Form.Label className="control-label">Email:</Form.Label>
                                <Form.Control type="email"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="registerPassword">
                                <Form.Label className="control-label">Password:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="registerConformPassword">
                                <Form.Label className="control-label">Confirm Password:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="default" onClick={handleCloseRegister}>Close</Button>
                            <Button variant="primary" type="submit" onClick={handleCloseRegister}>Register</Button>
                        </Modal.Footer>
                    </Form> */}
                </Modal>
                <Modal show={showLogin} onHide={handleCloseLogin}>
                    <Form onSubmit={handleSubmitLogin}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="loginEmail">
                                <Form.Label className="control-label">Email:</Form.Label>
                                <Form.Control type="email"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="loginPassword">
                                <Form.Label className="control-label">Password:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="default" onClick={handleCloseLogin}>Close</Button>
                            <Button variant="primary" type="submit" onClick={handleCloseLogin}>Login</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Modal show={showMessage} onHide={handleCloseMessage}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <div className="pre-auth">
                            <Button variant="default" className="pull-left" onClick={handleCloseMessage}>Close</Button>
                            <span>
                                <Button variant="primary" onClick={handleShowRegister}>Register</Button>
                                <Button variant="success" onClick={handleShowLogin}>Login</Button>
                            </span>
                        </div>
                        <div className="post-auth"></div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

Header.propTypes = {
    auth: PropTypes.bool
}

export default Header;