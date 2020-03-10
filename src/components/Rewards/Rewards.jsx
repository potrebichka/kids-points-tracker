import React from 'react';
import {Button} from 'react-bootstrap';
import AddReward from './AddReward';
import EditReward from './EditReward';
import PropTypes from 'prop-types';

class Rewards extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            rewards: {},
            showEditForm: false
        }
    }

    componentDidMount() {
        this.props.firebase.dbRef.ref("children/" + this.props.firebase.auth.currentUser.uid + "/" + this.props.id).once("value")
            .then(snapshot => 
            {
                this.setState({
                    rewards: snapshot.val().rewards ? snapshot.val().rewards : []
                });
            })
    }

    handleRewardCreation = (reward) => {
        var key = this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + this.props.id + "/rewards/" ).push().key;
        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + this.props.id + "/rewards/" + key).update({name: reward.name, points: reward.points});
        var rewardsStateSlice = {...this.state.rewards, key: {name: reward.name, points: reward.points}};
        this.setState({rewards: rewardsStateSlice});
    }

    render() {
        return (
            <div>
                <h3>Rewards:</h3>
                {
                    this.state.rewards.length === 0 ?
                    <h4>No rewards have been added</h4>
                    :                            
                    Object.keys(this.state.rewards).map(key => {
                        return (
                        <div key={key}>
                            <h3>{this.state.rewards[key].name} : {this.state.rewards[key].points} points</h3> 
                            <Button variant="info" type="button" onClick={() => this.setState({showEditForm: true})}>Edit</Button>
                            <Button variant="danger" type="button">Delete</Button>
                            <Button variant="success" type="button">Redeem</Button>
                            <EditReward name={this.state.rewards[key].name} points={this.state.rewards[key].points} onRewardUpdate={this.handleEditReward} onHide={() => this.setState({showEditForm: false})}/>
                            <br/>
                        </div>);
                    })
                }
                <br/>
                <Button type="button" variant="primary" onClick={() => this.setState({showRewardForm: true})}>Add a reward</Button>
                {this.state.showRewardForm ? 
                    <AddReward onRewardCreation={this.handleRewardCreation} onHide={() => this.setState({showRewardForm: false})}/>
                :null}
            </div>
        );
    }
}

Rewards.propTypes = {
    id: PropTypes.string
}

export default Rewards;