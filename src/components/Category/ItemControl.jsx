import React from 'react';
import PropTypes from 'prop-types';

class ItemControl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>Item Name: {this.props.name}</h3>
                <h4>Points for Item: {this.props.points}</h4>
                <hr/>
            </div>
        );
    }
}

ItemControl.propTypes = {
    name: PropTypes.string,
    points: PropTypes.number
}

export default ItemControl;