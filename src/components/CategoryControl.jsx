import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import EditCategory from './EditCategory';

class CategoryControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditForm: false
        }
    }

    handleShowEditFormClick = () => {
        this.setState({showEditForm: true})
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

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <Button type="button" variant="success" onClick={this.handleShowEditFormClick}>Edit Category</Button>
                <Button type="button" variant="danger" onClick={this.props.onCategoryDelete}>Delete category</Button>
                <hr/>
                {this.state.showEditForm ? 
                    <EditCategory id={this.props.id} name={this.props.name} onCategoryEdition={this.handleCategoryEdition} onHide={this.handleHideEditForm}/>
                :null}
            </div>);
    }
}

CategoryControl.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.object,
    onCategoryEditing: PropTypes.func,
    onCategoryDelete: PropTypes.func
}

export default CategoryControl;