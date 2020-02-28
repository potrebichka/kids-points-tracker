import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
    {/* <h1>Kids Points Tracker</h1>
    <Link to="/">Home</Link> | <Link to="/account">Create new post</Link> */}
    return (
        <div className="container">
            <div className="auth">
                <header className="clearfix">
                    <div className="userAuth unauthenticated pull-right">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#registerModal">Register</button>
                        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#loginModal">Login</button>
                    </div>
                    <div className="userAuth authenticated pull-right">
                        <span className="user-info">
                            <span className="user-name"></span>
                        </span>
                        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#savedListModal">Your Places</button>
                        <button type="button" className="btn btn-success" id="logout">Logout</button>
                    </div>
                </header>
                <hr/>
                <div className="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="Register" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="registerForm" method="POST">
                                <div className="modal-header">
                                <h4 className="modal-title" id="registerModalLabel">Register</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="recipient-name" className="control-label">First Name:</label>
                                        <input type="text" className="form-control" id="registerFirstName"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="recipient-name" className="control-label">Last Name:</label>
                                        <input type="text" className="form-control" id="registerLastName"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="recipient-name" className="control-label">Email:</label>
                                        <input type="text" className="form-control" id="registerEmail"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="message-text" className="control-label">Password:</label>
                                        <input type="password" className="form-control" id="registerPassword"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="message-text" className="control-label">Confirm Password:</label>
                                        <input type="password" className="form-control" id="registerConfirmPassword"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" id="doRegister">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="loginForm" method="POST">
                                <div className="modal-header">
                                <h4 className="modal-title" id="loginModalLabel">Login</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="recipient-name" className="control-label">Email:</label>
                                        <input type="text" className="form-control" id="loginEmail"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="message-text" className="control-label">Password:</label>
                                        <input type="password" className="form-control" id="loginPassword"/>
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
                <div className="modal fade" id="savedListModal" tabindex="-1" role="dialog" aria-labelledby="Add Contact" aria-hidden="true">
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
                <div className="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="Message" aria-hidden="true">
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
                </div>
            </div>
            <div className="box" id="box">
                <h1 className="title">
                    walk there
                </h1>
                <form id="findLocationForm">
                    <div className="form-group" id="locationInput">
                        <label for="userLocationInput">Your location:</label>
                        <input className="form-control" type="text" id="userLocationInput" placeholder="Leave empty to use your current location"/>
                    </div>
                    <div className="form-group" id="attractionInput">
                        <label for="userAttractionInput">Where are you going?</label>
                        <input className="form-control" type="text" id="userAttractionInput"/>
                    </div>
                    <button type="submit" className="btn btn-info">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Header;