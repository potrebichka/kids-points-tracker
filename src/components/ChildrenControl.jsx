import React from 'react';
import {Link, Route} from 'react-router-dom';
import { v4 } from 'uuid';
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
        // grab firebase data
    }

    handleNewChildCreation = (newChild) => {
        //firebase add later
        const newChildId = v4();
        const newState = {
            ...this.state.children,
            [newChildId]: newChild
        }
        this.setState({children: newState, showCreateNewChildForm: false})
    }

    handleClick = () => {
        this.setState({showCreateNewChildForm: true})
    }

    render() {
        return (
            <div>
                {this.state.onNewChildCreation ? null :
                    <div>
                        <h2>Children:</h2>
                        
                        {this.state.children.length === 0 ? 
                            <p>No children have been added</p> 
                            :
                            Object.keys(this.state.children).map(childId =>{
                                return <Child id={childId} name={this.state.children[childId].name} birthday={this.state.children[childId].birthday}/>
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