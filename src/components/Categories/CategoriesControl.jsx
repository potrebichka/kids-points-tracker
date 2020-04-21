import React from 'react';
import {Redirect} from 'react-router-dom';
import CategoryControl from './CategoryControl';
import NewCategory from './NewCategory';
import {Button} from 'react-bootstrap';

import AuthContext from '../../hoc/AuthContext';

class CategoriesControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {},
            showCreateNewCategoryForm: false,
        }
    }

    static contextType = AuthContext;
    
    componentDidMount() {
        if (this.context.authenticated) {
            this.props.firebase.dbRef.ref("/categories/" + this.props.firebase.auth.currentUser.uid).once("value")
                .then(snapshot => {
                    let newCategoriesList = {...this.state.categories};
                    for (let key in snapshot.val()) {
                        newCategoriesList = {
                            ...newCategoriesList,
                            [key]:
                                {name: snapshot.val()[key].name,
                                items: snapshot.val()[key].items}
                        }
                    }
                    this.setState({categories: newCategoriesList})
                })
        }
    }

    handleNewCategoryCreation = (newCategory) => {
        var newCategoryId = this.props.firebase.dbRef.ref('categories/' +  this.props.firebase.auth.currentUser.uid).push().key;
        newCategory.items = {};
        this.props.firebase.dbRef.ref('/categories/' + this.props.firebase.auth.currentUser.uid + "/" + newCategoryId).update(newCategory);

        const newState = {
            ...this.state.categories,
            [newCategoryId]: newCategory
        }
        this.setState({categories: newState,
        showCreateNewCategoryForm: false})
    }

    handleCategoryEdition = (updatedCategory) => {
        const updatedCategoryState= {...this.state.categories, [updatedCategory.id]: updatedCategory};
        this.setState({categories: updatedCategoryState});
        const id = updatedCategory.id;
        delete updatedCategory.id;
        this.props.firebase.dbRef.ref('/categories/' + this.props.firebase.auth.currentUser.uid + "/" + id).update(updatedCategory);
    }

    handleCategoryDeletion = (id) => {
        let copyState = {...this.state.categories};
        delete copyState[id];
        this.setState({categories: copyState});

        this.props.firebase.dbRef.ref('/categories/' + this.props.firebase.auth.currentUser.uid + '/' + id).remove();
    }
    
    render() {
        if (!this.context.authenticated) {
            return <Redirect to='/'/>
        }
        return (
            <div className="categories">
                <div>
                    <h1>Categories</h1>
                    <hr />
                    {Object.keys(this.state.categories).length === 0 ? 
                        <div><p>No categories have been added!</p></div>
                        :
                        Object.keys(this.state.categories).map(categoryId => {
                            return (
                                <CategoryControl id={categoryId} name={this.state.categories[categoryId].name} items={this.state.categories[categoryId].items} key={categoryId} onCategoryEdition={this.handleCategoryEdition} onCategoryDeletion={() => {this.handleCategoryDeletion(categoryId)}}/>
                            )
                        })
                    }
                   <Button variant="info" type="button" onClick={() => this.setState({showCreateNewCategoryForm: true})}>Add a new category</Button>
                    {this.state.showCreateNewCategoryForm ?
                        <NewCategory onNewCategoryCreation={this.handleNewCategoryCreation} onHide={() => this.setState({showCreateNewCategoryForm: false})}/>
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default CategoriesControl;