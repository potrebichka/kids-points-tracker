import React from 'react';
import {Button} from 'react-bootstrap';

class SubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {childrenList: []}
        this.palette = ['#FFC312', '#C4E538', '#12CBC4', '#FDA7DF', '#ED4C67', '#EA2027', '#006266', '#1B1464', '#5758BB', '#6F1E51'];
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
                {this.state.childrenList.map((item,idx) => {
                    const color = this.palette[idx%this.palette.length];
                    console.log(color)
                    return <Button type="button" key={item.id} style={{backgroundColor: color}}>{item.name}</Button>
                })}
            </div>
        );
    }
}

export default SubHeader;