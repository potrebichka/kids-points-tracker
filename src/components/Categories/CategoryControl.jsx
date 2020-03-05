import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import EditCategory from './EditCategory';
import DeleteCategoryConfirmation from './DeleteCategoryConfirmation';

class CategoryControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditForm: false,
            showDeleteForm: false
        }
    }

    handleShowEditFormClick = () => {
        this.setState({showEditForm: true, showDeleteForm: false})
    }

    handleCategoryEdition = (updatedCategory) => {
        updatedCategory.id = this.props.id;
        updatedCategory.items = this.props.items;
        console.log(updatedCategory);
        this.props.onCategoryEdition(updatedCategory);
        this.setState({showEditForm: false});
    }

    handleHideEditForm = () => {
        this.setState({showEditForm: false});
    }

    handleShowDeleteForm = () => {
        this.setState({showDeleteForm: true});
    }

    handleHideDeleteForm = () => {
        this.setState({showDeleteForm: false});
    }

    handleCategoryDeletion = () => {
        this.setState({showDeleteForm: false});
        this.props.onCategoryDeletion();
    }

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <Button type="button" variant="success" onClick={this.handleShowEditFormClick}>Edit Category</Button>
                <Button type="button" variant="danger" onClick={this.handleShowDeleteForm}>Delete category</Button>
                <hr/>
                {this.state.showEditForm ? 
                    <EditCategory id={this.props.id} name={this.props.name} onCategoryEdition={this.handleCategoryEdition} onHide={this.handleHideEditForm}/>
                :null}
                {this.state.showDeleteForm ? 
                    <DeleteCategoryConfirmation onCategoryDeletion={this.handleCategoryDeletion} onHide={this.handleHideDeleteForm} name={this.props.name}/>
                    : null
                }
            </div>);
    }
}

CategoryControl.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.object,
    onCategoryEdition: PropTypes.func,
    onCategoryDeletion: PropTypes.func
}

export default CategoryControl;