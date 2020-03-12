import React from 'react';
import {Button} from 'react-bootstrap';
import AddReward from './AddReward';
import EditReward from './EditReward';
import DeleteRewardConfirmation from './DeleteRewardConfirmation';
import SelectRewardConfirmation from './SelectRewardConfirmation';
import PropTypes from 'prop-types';

class Rewards extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            rewards: {},
            showEditForm: false,
            showDeleteConfirmation: false,
            showSelectConfirmation: false,
            currentKey: null
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

    handleEditReward = (reward) => {
        var id = reward.id;
        delete reward.id;
        var copyStateSlice = {...this.state.rewards, [id]: {name: reward.name, points: reward.points}};
        this.setState({rewards: copyStateSlice});

        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + this.props.id + "/rewards/" + id).update({name: reward.name, points: reward.points});
    }

    handleRewardDeletion = (id) => {
        var copyStateSlice = {...this.state.rewards};
        delete copyStateSlice[id];
        this.setState({rewards: copyStateSlice});

        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + this.props.id + "/rewards/" + id).remove();
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
                            <Button variant="info" type="button" onClick={() => this.setState({showEditForm: true, currentKey: {key}})}>Edit</Button>
                            <Button variant="danger" type="button" onClick={() => this.setState({showDeleteConfirmation: true, currentKey: {key}})}>Delete</Button>
                            <Button variant="success" type="button" onClick={() => this.setState({showSelectConfirmation: true, currentKey: {key}})}>Select</Button>
                            {this.state.showEditForm && (key == this.state.currentKey.key) ? 
                                <EditReward name={this.state.rewards[key].name} points={this.state.rewards[key].points} onRewardUpdate={this.handleEditReward} id={key} onHide={() => this.setState({showEditForm: false, currentKey: null})}/> 
                            :null}
                            {this.state.showDeleteConfirmation && (key == this.state.currentKey.key) ? 
                                <DeleteRewardConfirmation name={this.state.rewards[key].name} onHide={() => this.setState({showDeleteConfirmation: false})} onRewardDeletion={() => {this.handleRewardDeletion(key); this.setState({currentKey: null})}}/>
                            :null}
                            {this.state.showSelectConfirmation && (key == this.state.currentKey.key) ? 
                                <SelectRewardConfirmation name={this.state.rewards[key].name} points={this.state.rewards[key].points} onHide={() => this.setState({showSelectConfirmation: false})} onRewardSelection={() => {this.props.onRewardSelection(key); this.setState({currentKey: null})}}/>
                            :null}
                            <hr/>
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
    id: PropTypes.string,
    onRewardSelection: PropTypes.func
}

export default Rewards;