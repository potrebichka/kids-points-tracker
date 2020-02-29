import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            showInfo: false
        }
    }

    handleShowInfoClick = () => {
        this.setState({showInfo: !this.state.showInfo});
    }

    render() {
        let yearDifference = Moment(new Date()).diff(Moment(this.props.birthday), 'years');
        const name = this.state.showInfo ? "Hide Info" : "Show Info";
        return (
            <div>
                <h3>{this.props.name}</h3>
                <button type="button" className="btn btn-primary" onClick={this.handleShowInfoClick}>{name}</button>
                {this.state.showInfo ? 
                    <div>
                        <h2>Child information</h2>
                        <p>Name: {this.props.name}</p>
                        <p>Birthday: {this.props.birthday}</p>
                        <p>Your child is {yearDifference} years old.</p>
                        <p>Points: {this.state.points}</p>
                        <button type="button" className="btn btn-success">Edit Child</button>
                        <button type="button" className="btn btn-danger">Delete Child</button>
                    </div>
                    : null
                }
            </div>
        );
    }
}

Child.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.instanceOf(Date)
}

export default Child;