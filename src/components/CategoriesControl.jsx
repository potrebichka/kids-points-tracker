import React from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import CategoryControl from './CategoryControl';
import NewCategory from './NewCategory';
import {Button} from 'react-bootstrap';

class CategoriesControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {},
            showCreateNewCategoryForm: false
        }
    }
    
    componentDidMount() {
        this.props.firebase.dbRef.ref("categories/" + this.props.firebase.auth.currentUser.uid).once("value")
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

    handleNewCategoryCreation = (category) => {

    }
    
    render() {
        if (!this.props.auth) {
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
                                <CategoryControl id={categoryId} name={this.state.categories[categoryId].name} items={this.state.categories[categoryId].items} key={categoryId} />
                            )
                        })
                    }
                    <Button variant="info" type="button" onClick={() => this.setState({showCreateNewCategoryForm: true})}>Add a new category</Button>
                    {this.state.showCreateNewCategoryForm ? 
                        <NewCategory onNewCategoryCreation={this.handleNewCategoryCreation} />
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default CategoriesControl;