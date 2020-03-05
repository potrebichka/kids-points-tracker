import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';
import { Button, Modal} from 'react-bootstrap';
import RegisterPage from './Register';
import LoginPage from './Login';
import SignOut from './SignOut';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

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

    const handleRegisterLink = () => {setShowLogin(false); setShowRegister(true)}

    const handleAuthChange = () => {
        setShowRegister(false);
        setShowLogin(false);
        props.onAuthStatusChange();
    }

    
    {/* <Link to="/">Home</Link> | <Link to="/account">Create new post</Link> */}
    let classAuth ="auth";
    if (props.auth) {
        classAuth += " auth-true";
    } else {
        classAuth += " auth-false";
    }
    return (
        <div className="header">
            <div className={classAuth}>
                <span className="title">Kids Points Tracker   </span>  
                <header className="clearfix">
                    <div className="userAuth unauthenticated pull-right">
                                  
                        <Link to="/"><button type="button" className="btn btn-secondary"><FontAwesomeIcon icon={faHome} /> Home</button></Link>
                        <Button variant="primary" onClick={handleShowRegister}>Register</Button>
                        <Button variant="success" onClick={handleShowLogin}>Login</Button>
                    </div>
                    <div className="userAuth authenticated pull-right">
                        <span className="user-info">
                            <span className="user-name"></span>
                        </span>
                        <Link to="/"><button type="button" className="btn btn-secondary">Home</button></Link>
                        <Link to="/children"><Button variant="success" onClick={props.onChildrenClick}>Your Children</Button></Link>
                        <Link to="/categories"><Button variant="info">Your Categories</Button></Link>
                        <SignOut onAuthChange={handleAuthChange}/>
                    </div>
                </header>
                <hr/>
                <Modal show={showRegister} onHide={handleCloseRegister}>}
                    <RegisterPage  onCloseRegister={handleCloseRegister} onAuthSuccess={handleAuthChange}/>
                </Modal>
                <Modal show={showLogin} onHide={handleCloseLogin}>
                    <LoginPage onCloseLogin={handleCloseLogin} onRegisterLink={handleRegisterLink} onAuthSuccess={handleAuthChange}/>
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
    auth: PropTypes.bool,
    onAuthStatusChange: PropTypes.func,
    onChildrenClick: PropTypes.func
}

export default Header;