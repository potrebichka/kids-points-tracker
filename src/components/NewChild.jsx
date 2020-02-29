import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

class NewChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toList: false}
        this._name = null;
        this._birthday = null;
    }

    handleNewChildFormSubmission = (event)  => {
        event.preventDefault();
        this.props.onNewChildCreation({name: this._name.value, birthday: this._birthday.value});
        this._name.value = '';
        this._birthday.value = null;
        this.setState({toList: true})
    }

    render() 
    {
        if (this.state.toList) {
            return <Redirect to="/children"/>
        } 
        return (
            <div>
                <form onSubmit={this.handleNewChildFormSubmission}>
                    <h2>New Child</h2>
                    <label>Enter a name:
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Name of child" 
                            ref={(input) => {this._name = input;}}
                        />
                    </label>
                    <br/>
                    <label>Enter birthday
                        <input
                            type="date"
                            id="birthday"
                            className="form-control"
                            ref={(input) => {this._birthday = input;}}
                        /> 
                    </label>
                    <br/>

                    <button type="submit" className="btn btn-info">Add</button>
                </form>
        </div>
        );
    }
}

NewChild.propTypes = {
    onNewChildCreation: PropTypes.func
}

export default NewChild;