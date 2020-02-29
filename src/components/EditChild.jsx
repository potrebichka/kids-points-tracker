import React from 'react';
import PropTypes from 'prop-types';

const EditChild = (props) => {
    let _name = props.name;
    let _birthday = props.birthday;

    handleEditChildFormSubmission = (event)  => {
        event.preventDefault();
        this.props.onChildEditing({name: this._name.value, birthday: this._birthday.value});
        this._name.value = '';
        this._birthday.value = null;
        this.setState({toList: true})
    }

    return (
        <div>
            <form onSubmit={this.handleEditChildFormSubmission}>
                <h2>Edit Child</h2>
                <label>Enter a name:
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder={props.name} 
                        defaultValue={props.name}
                        ref={(input) => {_name = input;}}
                    />
                </label>
                <br/>
                <label>Enter birthday
                    <input
                        type="date"
                        id="birthday"
                        className="form-control"
                        defaultValue={props.birthday}
                        ref={(input) => {_birthday = input;}}
                    /> 
                </label>
                <br/>

                <button type="submit" className="btn btn-success">Edit</button>
            </form>
        </div>
    );
}

EditChild.propTypes = {
    name: PropTypes.string,
    birthday: PropTypes.instanceOf(Date),
    onChildEditing: PropTypes.func
}

export default EditChild;