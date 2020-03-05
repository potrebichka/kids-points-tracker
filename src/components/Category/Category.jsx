import React from 'react';
import ItemControl from './ItemControl';
import {Redirect} from 'react-router-dom';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", items: {}, id: null}
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
            <div>
                <h2>Category name: {this.state.name}</h2>
                <h3>Items in category:</h3>
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
            </div>
        );
    }
}

export default Category;