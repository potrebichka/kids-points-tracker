import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import EditChild from './EditChild';

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            showInfo: false,
            showEditForm: false
        }
    }

    handleShowInfoClick = () => {
        this.setState({showInfo: !this.state.showInfo});
    }

    handleShowEditFormClick = () => {
        this.setState({
            showInfo: false,
            showEditForm: true
        })
    }

    handleChildEditing = (updatedChild) => {
        updatedChild.id = this.props.id;
        this.props.onChildEditing(updatedChild);
        this.setState({
            showInfo: true,
            showEditForm: false
        })
    }

    handleHideEditForm = () => {
        this.setState({showEditForm: false});
    }

    render() {
        let yearDifference = Moment(new Date()).diff(Moment(this.props.birthday), 'years');
        const name = this.state.showInfo ? "Hide Info" : "Show Info";
        return (
            <div>
                <h3>{this.props.name}</h3>
                <button type="button" className="btn btn-primary" onClick={this.handleShowInfoClick}>{name}</button>
                <hr/>
                {this.state.showInfo ? 
                    <div>
                        <h2>Child information</h2>
                        <p>Name: {this.props.name}</p>
                        <p>Birthday: {this.props.birthday}</p>
                        <p>Your child is {yearDifference} years old.</p>
                        <p>Points: {this.state.points}</p>
                        <button type="button" className="btn btn-success" onClick={this.handleShowEditFormClick}>Edit Child</button>
                        <button type="button" className="btn btn-danger" onClick={this.props.onDeleteClick}>Delete Child</button>
                        <hr/>
                    </div>
                    : null
                }
                {this.state.showEditForm ? 
                    <EditChild id={this.props.id} name={this.props.name} birthday={this.props.birthday} onChildEditing={this.handleChildEditing} onHide={this.handleHideEditForm}/>
                : null
                }
            </div>
        );
    }
}

Child.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    onChildEditing: PropTypes.func,
    onDeleteClick: PropTypes.func
}

export default Child;