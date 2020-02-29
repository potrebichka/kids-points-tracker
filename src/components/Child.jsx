import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0
        }
    }
    render() {
        let yearDifference = Moment(new Date()).diff(Moment(this.props.birthday), 'years');
        return (
            <div>
                <h2>Child information</h2>
                <p>Name: {this.props.name}</p>
                <p>Birthday: {this.props.birthday}</p>
                <p>Your child is {yearDifference} years old.</p>
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