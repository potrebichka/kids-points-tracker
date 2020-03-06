import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import Moment from 'moment';

class ChildControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            birthday: null, 
            points: 0, 
            history: [], 
            categories: {}, 
            showCategories: false, 
            showItems: false,
            showQuantity: false,
            showRedeemButton: false,
            showHistory: false
        }
        this._category = null;
        this._item = null;
        this._quantity = 0;
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
            .then(() => {
                this.props.firebase.dbRef.ref("categories/" + this.props.firebase.auth.currentUser.uid + "/").once("value")
                    .then(snapshot => {
                        let categories = {};
                        for (let key in snapshot.val()) {
                            categories[snapshot.val()[key].name] = [];
                            for (let itemKey in snapshot.val()[key].items) {
                                categories[snapshot.val()[key].name].push(snapshot.val()[key].items[itemKey]);
                            }
                        }
                        this.setState({categories: categories})
                    })
            })
        }
    }

    handleRedeemPoints = event => {
        event.preventDefault();
        let history = {...this.state.history, [new Moment()]: this._category.value + " / " + this._item.value.name + " / " + this._quantity.value + " / " + parseInt(this._item.value.points) * parseInt(this._quantity.value)};
        this.setState({
            points: this.state.points + parseInt(this._item.value.points) * parseInt(this._quantity.value), 
            history: history, 
            showCategories: false, 
            showItems: false,
            showQuantity: false,
            showRedeemButton: false
        })
    }

    handleRedeemPointsButtonClick = () => {
        !this.state.showCategories ? 
            this.setState({
                showCategories: true, 
                showItems: false, 
                showQuanity: false, 
                showRedeemButton: false})
                :
            this.setState({
                showCategories: false, 
                showItems: false,
                showQuantity: false,
                showRedeemButton: false})
    }

    render(){
        if (!this.props.auth) {
            return <Redirect to="/" />
        }
        const redeemButtonName = this.state.showCategories ? "Hide redeem points form" : "Redeem points";

        let categoriesOptions = [];
        for (let key in this.state.categories) {
            categoriesOptions.push({value: key, label: key})
        }

        let itemsCategories = [];
        if (this._category) {     
            for (let i in this.state.categories[this._category.value]) {
                const item = this.state.categories[this._category.value][i];
                itemsCategories.push({value: item, label: item.name + " (" + item.points + ")" })
            }
        }

        return (
            <div className="child">
                <h1>{this.state.name}</h1>
                <em>{this.state.birthday}</em>
                <h3>Number of available points: {this.state.points}</h3>
                <hr/>
                <Button variant="info" type="button" onClick={this.handleRedeemPointsButtonClick}>{redeemButtonName}</Button>
                <hr />
                <Form onSubmit={this.handleRedeemPoints}>
                {this.state.showCategories ? 
                        <Select 
                            options={categoriesOptions} 
                            className="select" 
                            placeholder="Select Category ..." 
                            onChange={(input) => {this.setState({showItems: true}); this._category = input;}} 
                            />
                : null }
                {this.state.showItems ? 
                    <Select 
                        options={itemsCategories} 
                        className="select" 
                        placeholder="Select Item ..." 
                        onChange={(input) => {this.setState({showQuantity: true}); this._item = input}} 
                        />
                : null}
                {this.state.showQuantity ? 
                    <Form.Group>
                        <Form.Label className="control-label">Quantity:</Form.Label>
                        <br/>
                        <input 
                            type="number" 
                            name="quantity" 
                            className="select"
                            onChange={(input) => {this.setState({showRedeemButton: true}); this._quantity = input}}
                            ref={(input) => this._quantity = input}/>
                    </Form.Group>
                : null}
                {this.state.showRedeemButton ? 
                    <Button type="info" type="submit">Redeem</Button>
                :null}
                </Form>
                <hr/>
                <Button variant="secondary" type="button" onClick={() => this.setState({showHistory: !this.state.showHistory})}>Show History</Button>
                <hr/>
                {this.state.showHistory ? 
                    Object.keys(this.state.history).map(id => {
                        return <p key={id} className="history-item">{Moment(id).format('L') + ":   " +  this.state.history[id]}</p>
                    })
                :null}
            </div>
        );
    }
}

export default ChildControl;