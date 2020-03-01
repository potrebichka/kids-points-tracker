import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';

const Header = (props) => {

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleSubmitRegister = () => {
        console.log('Submit');
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
                    <Form onSubmit={handleSubmitRegister}>
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
                    </Form>
                </Modal>
              
                                {/* 


                                <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" id="doRegister">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="loginForm" method="POST">
                                <div className="modal-header">
                                <h4 className="modal-title" id="loginModalLabel">Login</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="control-label">
                                            Email:
                                            <input type="text" className="form-control" id="loginEmail"/>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Password:
                                            <input type="password" className="form-control" id="loginPassword"/>
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" id="doLogin">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="savedListModal" tabIndex="-1" role="dialog" aria-labelledby="Add Contact" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="savedListModalLabel">Saved Places</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-body" id="savedPlacesList">

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="messageModal" tabIndex="-1" role="dialog" aria-labelledby="Message" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="messageModalLabel">Message</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className="modal-footer">
                                <div className="pre-auth">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <span className="">
                                    <button type="submit" className="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#registerModal">Register</button>
                                    <button type="submit" className="btn btn-success" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">Login</button>
                                </span>
                                </div>
                                <div className="post-auth"></div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

Header.propTypes = {
    auth: PropTypes.bool
}

export default Header;