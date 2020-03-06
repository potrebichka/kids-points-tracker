import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button } from 'react-bootstrap';

class ChildControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", birthday: null, points: 0, history: []
        }
    }

    componentDidMount() {
        if (this.props.auth) {
            this.props.firebase.dbRef.ref("children/" + this.props.firebase.auth.currentUser.uid + "/" + this.props.id).once("value")
                .then(snapshot => 
                    {
                        this.setState({
                            name: snapshot.val().name, 
                            birthday: snapshot.val().birthday, 
                            points: snapshot.val().points ? this.state.points : 0,
                            history: snapshot.val().history ? snapshot.val().history : []
                        });
                })
        }
    }

    render(){
        if (!this.props.auth) {
            return <Redirect to="/" />
        }
        return (
            <div className="child">
                <h1>{this.state.name}</h1>
                <em>{this.state.birthday}</em>
                <h3>Number of available points: {this.state.points}</h3>
                <hr/>
                <Button varint="info" type="button">Redeem points</Button>
            </div>
        );
    }
}

export default ChildControl;