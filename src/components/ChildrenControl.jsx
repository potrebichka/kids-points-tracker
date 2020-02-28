import React from 'react';
import {Link} from 'react-router-dom';
import { v4 } from 'uuid';
import Child from './Child';

class ChildrenControl extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            children: {}
        }
    }

    ccomponentDidMount() {
        // grab firebase data
    }

    handleNewChildCreation(newChild) {
        //firebase add later
        const newChildId = v4();
        const newState = {
            ...this.state.children,
            [newChildId]: newChild
        }
        this.setState({children: newState})
    }

    render() {
        return (
            <div>
                <h2>Children:</h2>
                {this.state.children.length === 0 ? 
                    <p>No children have been added</p> 
                    :
                    Object.keys(this.state.children).map(function(childId) {
                        <Child id={childId} name={this.state.children[childId].name} birthday={this.state.children[childId].birthday}/>
                    })
                }
                <Link to='/children/new'><button type="button" className="btn btn-info" onNewChildCreation={this.handleNewChildCreation}>Add a new child</button></Link>
            </div>
        );
    }
}

export default ChildrenControl;