import React from 'react';
import ItemControl from './ItemControl';
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import NewItem from './NewItem';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", items: {}, id: null, showCreateNewItemForm: false}
    }
    

    componentDidMount() {
        if (this.props.auth) {
            this.setState({id: this.props.id, name: this.props.name, items: this.props.items})
        }
    }

    handleNewItemCreation = (newItem) => {
        if (Object.keys(this.state.items).length === 0) {
            this.props.firebase.dbRef.ref('/categories/' + this.props.firebase.auth.currentUser.uid + "/" + this.state.id).update({items: {}});
        }
        var newItemId = this.props.firebase.dbRef.ref('/categories/' +  this.props.firebase.auth.currentUser.uid + "/" + this.state.id + "/items/").push().key;
        this.props.firebase.dbRef.ref('/categories/' + this.props.firebase.auth.currentUser.uid + "/" + this.state.id + "/items/" + newItemId).update(newItem);

        const newState = {
            ...this.state.items,
            [newItemId]: newItem
        }
        this.setState({items: newState, showCreateNewItemForm: false})
    }

    handleItemEdition = (updatedItem) => {
        const updatedItemsState= {...this.state.items, [updatedItem.id]: updatedItem};
        this.setState({items: updatedItemsState});
        const id = updatedItem.id;
        delete updatedItem.id;
        this.props.firebase.dbRef.ref('/categories/' + this.props.firebase.auth.currentUser.uid + "/" + this.state.id + '/items/' + id).update(updatedItem);
    }

    handleItemDeletion = (id) => {
        let copyState = {...this.state.items};
        delete copyState[id];
        this.setState({items: copyState});

        this.props.firebase.dbRef.ref('/categories/' + this.props.firebase.auth.currentUser.uid + '/' + this.state.id + '/items/' + id).remove();
    }

    render() {
        if (!this.props.auth) {
            return <Redirect to="/"/>
        }
        return (
            <div className="category">
                <h2>Category Name: {this.state.name}</h2>
                <hr/>
                <h3>Items in category:</h3>
                <hr/>
                {Object.keys(this.state.items).length === 0 ?
                    <h3>No items have been added to Category!</h3>
                    :
                    Object.keys(this.state.items).map(itemId => {
                        return (
                            <ItemControl 
                                id={itemId} 
                                name={this.state.items[itemId].name} 
                                points={this.state.items[itemId].points} 
                                key={itemId}
                                onItemEdition={this.handleItemEdition}
                                onItemDeletion={() => this.handleItemDeletion(itemId)}
                                />
                        );
                    })
                }
                <Button variant="info" type="button" onClick={() => this.setState({showCreateNewItemForm: true})}>Add a new Item</Button>
                {this.state.showCreateNewItemForm ?
                <NewItem onHide={() => this.setState({showCreateNewItemForm: false})} onNewItemCreation={this.handleNewItemCreation} />
                : null
                }
            </div>
        );
    }
}

export default Category;