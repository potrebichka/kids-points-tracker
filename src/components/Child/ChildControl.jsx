import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button} from 'react-bootstrap';
import Rewards from './../Rewards/Rewards';
import RedeemPoints from './RedeemPoints';
import PropTypes from 'prop-types';
import Moment from 'moment';

class ChildControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            birthday: null, 
            points: 0, 
            history: [], 
            showRedeemForm: false,
            showHistory: false,
            showRewards: false,
        }
    }

    componentDidMount() {
        this.updateState();
    }

    updateState() {
        if (this.props.auth) {
            this.props.firebase.dbRef.ref("children/" + this.props.firebase.auth.currentUser.uid + "/" + this.props.id).once("value")
                .then(snapshot => 
                {
                    this.setState({
                        name: snapshot.val().name, 
                        birthday: snapshot.val().birthday, 
                        points: snapshot.val().points ? snapshot.val().points : 0,
                        history: snapshot.val().history ? snapshot.val().history : [],
                        showHistory: false,
                        showRewards: false,
                        showRedeemForm: false
                    });
                })
        }
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.id !== prevProps.id) {
           this.updateState();
        }
      }

    handleRedeemPoints = (result) => {
        const newPoints = this.state.points + result.points;

        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + this.props.id ).update({points: newPoints});
        this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + this.props.id + "/history/" + new Moment() + "/").update( result.history);


        let history = {
            ...this.state.history, 
            [new Moment()]:  result.history
        };

        this.setState({
            points: newPoints, 
            history: history, 
            showRewards: false,
            showRedeemForm: false
        });

    }

    handleRewardSelection = (rewardId) => {
        
        let reward = {};
        this.props.firebase.dbRef.ref("/children/" + this.props.firebase.auth.currentUser.uid + "/" + this.props.id + "/rewards/" + rewardId).once("value").then(snapshot => 
        {
            reward = snapshot.val();
        })
        .then(() =>
        {
            let history = {
                ...this.state.history, 
                [new Moment()]:  
                    ["Reward", reward.name, 1, -parseInt(reward.points)]
            };
    
            this.props.firebase.dbRef.ref("/children/" + this.props.firebase.auth.currentUser.uid + "/" + this.props.id).update({points: this.state.points - reward.points});

            this.props.firebase.dbRef.ref('/children/' + this.props.firebase.auth.currentUser.uid + "/" + this.props.id + "/history/" + new Moment() + "/").update( ["Reward", reward.name, 1, -parseInt(reward.points)]);

            this.setState({
                points: this.state.points-parseInt(reward.points), 
                history: history, 
                showRedeemForm: false,
                showRewards: false
            });

        });
    }

    render(){
        if (!this.props.auth) {
            return <Redirect to="/" />
        }

        let historyTimeSorted = Object.keys(this.state.history).slice();
        historyTimeSorted.sort((a,b) => b-a);
        historyTimeSorted = historyTimeSorted.slice(0,10);

        return (
            <div className="child">
                <h1>{this.state.name}</h1>
                <em>{this.state.birthday}</em>
                <h3>Number of available points: {this.state.points}</h3>
                <hr/>
                <Button variant="info" type="button" onClick={() => this.setState({showRedeemForm: true})}>Redeem Points</Button>
                <Button variant="success" type="button" onClick={() => this.setState({showRewards: !this.state.showRewards, showHistory: false})}>Choose Reward</Button>
                <Button variant="secondary" type="button" onClick={() => this.setState({showHistory: !this.state.showHistory, showRewards: false})}>Show History</Button>
                <hr />
                {this.state.showRedeemForm ? <RedeemPoints firebase={this.props.firebase} id={this.props.id} onRedeemPoints={this.handleRedeemPoints} onHide={() => this.setState({showRedeemForm: false})}/> : null}
                <hr/>
                {this.state.showRewards ?
                    <Rewards id={this.props.id} firebase={this.props.firebase} onRewardSelection={this.handleRewardSelection}/>
                :null}
                {this.state.showHistory ?
                    this.state.history !== [] ?                
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Points</th>
                            </tr>
                            
                        </thead>
                    {historyTimeSorted.map(id => {
                        return <tbody key={id} className="history-item">
                            <tr>
                                <td>{Moment(parseInt(id)).format('LLL')}</td> 
                                <td>{this.state.history[id][0]}</td>
                                <td>{this.state.history[id][1]}</td>
                                <td>{this.state.history[id][2]}</td>
                                <td>{this.state.history[id][3]}</td>
                            </tr>
                        </tbody>
                    })}
                    </table>
                    : <h4>History is empty</h4>
                :null}
            </div>
        );
    }
}

ChildControl.propTypes = {
    id: PropTypes.string
}

export default ChildControl;