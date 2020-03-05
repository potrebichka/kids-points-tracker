import React from 'react';
import {Button} from 'react-bootstrap';

class SubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {childrenList: []}
    }

    componentDidMount() {
        let newChildrenList = []
        this.props.firebase.dbRef.ref("children/" + this.props.firebase.auth.currentUser.uid).once("value")
        .then(snapshot => {
            for (let key in snapshot.val()) {
                newChildrenList.push({id: key, name: snapshot.val()[key].name})
            }
            this.setState({childrenList: newChildrenList})
        })
    }
    
    render(){
        return (
            <div className="subheader">
                {this.state.childrenList.map((item) => {
                    return <Button type="button" key={item.id}>{item.name}</Button>
                })}
            </div>
        );
    }
}

export default SubHeader;