import React from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import Child from './Child';
import NewChild from './NewChild';

class ChildrenControl extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            children: {},
            showCreateNewChildForm: false
        }
    }

    componentDidMount() {
        if (this.props.auth) {
        this.props.firebase.dbRef.ref("children/" + this.props.firebase.auth.currentUser.uid).once("value")
            .then(snapshot => 
                {
                    let newChildrenList = {...this.state.children}
                    for (let key in snapshot.val()) {
                        newChildrenList = {
                            ...newChildrenList, 
                            [key] : 
                                {name: snapshot.val()[key].name, 
                                birthday: snapshot.val()[key].birthday}};
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

    handleClick = () => {
        this.setState({showCreateNewChildForm: true})
    }

    handleChildEditing = (updatedChild) => {
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
        if (!this.props.auth) {
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
                                return <Child id={childId} name={this.state.children[childId].name} birthday={this.state.children[childId].birthday} onChildEditing={this.handleChildEditing} key={childId} onDeleteClick={() => {this.handleChildDeletion(childId)}}/>
                            })
                        }
                        <Link to='/children/new'><button type="button" className="btn btn-info" onClick={this.handleClick}>Add a new child</button></Link>
                    </div>
                }
                <Route path='/children/new' render={() => <NewChild onNewChildCreation={this.handleNewChildCreation}/>}/>
            </div>
        );
    }
}

export default ChildrenControl;