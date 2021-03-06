import React from 'react';
import {Redirect} from 'react-router-dom';
import Child from '../Child';
import NewChild from './NewChild';

import AuthContext from '../../hoc/AuthContext';

class ChildrenControl extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            children: {},
            showCreateNewChildForm: false
        }
    }

    static contextType = AuthContext;

    componentDidMount() {
        if (this.context.authenticated) {
            this.props.firebase.dbRef.ref("children/" + this.props.firebase.auth.currentUser.uid).once("value")
                .then(snapshot => 
                    {
                        let newChildrenList = {...this.state.children}
                        for (let key in snapshot.val()) {
                            newChildrenList = {
                                ...newChildrenList, 
                                [key] : 
                                    {name: snapshot.val()[key].name, 
                                    birthday: snapshot.val()[key].birthday,
                                    points: snapshot.val()[key].points}};
                        }
                        this.setState({children: newChildrenList});
                })
            }
    }

    handleNewChildCreation = (newChild) => {
        var newChildId = this.props.firebase.dbRef.ref('children' + this.props.firebase.auth.currentUser.uid).push().key;
        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + newChildId).update(newChild);

        
        const newState = {
            ...this.state.children,
            [newChildId]: newChild
        }
        this.setState({children: newState, showCreateNewChildForm: false})
    }


    handleChildEdition = (updatedChild) => {
        const updatedChildState = {...this.state.children, [updatedChild.id]: updatedChild};
        this.setState({children: updatedChildState});
        const id = updatedChild.id;
        delete updatedChild.id;
        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + id).update(updatedChild);
    }

    handleChildDeletion = (id) => {
        let copyState = {...this.state.children};
        delete copyState[id];
        this.setState({children: copyState});
        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + id).remove();
    }

    render() {
        if (!this.context.authenticated) {
            return <Redirect to="/"/>
        }
        return (
            <div className="children">
                {this.state.onNewChildCreation ? null :
                    <div>
                        <h1>Children:</h1>
                        <hr/>
                        {Object.keys(this.state.children).length === 0 ? 
                            <div><p>No children have been added!</p> <hr/></div>
                            :
                            Object.keys(this.state.children).map(childId =>{
                                return <Child 
                                        id={childId} 
                                        name={this.state.children[childId].name} 
                                        birthday={this.state.children[childId].birthday} 
                                        points={this.state.children[childId].points}
                                        onChildEdition={this.handleChildEdition} 
                                        key={childId} 
                                        onDeleteClick={() => {this.handleChildDeletion(childId)}}/>
                            })
                        }
                        <button type="button" className="btn btn-info" onClick={() => this.setState({showCreateNewChildForm: true})}>Add a new child</button>
                        {this.state.showCreateNewChildForm ? 
                            <NewChild onNewChildCreation={this.handleNewChildCreation} onHide={() => this.setState({showCreateNewChildForm: false})}/>
                        :null}
                    </div>
                }
            </div>
        );
    }
}

export default ChildrenControl;