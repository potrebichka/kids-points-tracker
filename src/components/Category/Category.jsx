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
            this.props.firebase.dbRef.ref("/categories/" + this.props.firebase.auth.currentUser.uid + "/" + this.props.id).once("value")
                .then(snapshot => {
                    console.log(snapshot.val());
                    const name = snapshot.val().name;
                    const newItemsList = snapshot.val().items ? snapshot.val().items : {};
                    this.setState({name: name, items: newItemsList, id: this.props.id})
                })
        }
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
                                />
                        );
                    })
                }
                <Button variant="info" type="button" onClick={() => this.setState({showCreateNewItemForm: true})}>Add a new Item</Button>
                {this.state.showCreateNewItemForm ?
                <NewItem onHide={() => this.setState({showCreateNewItemForm: false})}/>
                : null
                }
            </div>
        );
    }
}

export default Category;