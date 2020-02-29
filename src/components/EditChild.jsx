import React from 'react';
import PropTypes from 'prop-types';

const EditChild = (props) => {
    let _name = null;
    let _birthday = null;

    function handleEditChildFormSubmission (event) {
        event.preventDefault();
        props.onChildEditing({name: _name.value, birthday: _birthday.value});
        _name.value = '';
        _birthday.value = null;
    }

    return (
        <div>
            <form onSubmit={handleEditChildFormSubmission}>
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
    birthday: PropTypes.string,
    onChildEditing: PropTypes.func
}

export default EditChild;