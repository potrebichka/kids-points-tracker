import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';

class RedeemPoints extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            categories: {},
            showCategories: true, 
            showItems: false,
            showQuantity: false,
            showRedeemButton: false,
        };

        this._category = null;
        this._item = null;
        this._quantity = 0;
    }

    componentDidMount() {
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
    }

    handleRedeemPoints = event => {
        event.preventDefault();

        this.props.onRedeemPoints({points: parseInt(this._item.value.points) * parseInt(this._quantity.value), history:  
        [this._category.value, this._item.value.name, this._quantity.value, parseInt(this._item.value.points) * parseInt(this._quantity.value)]});

    }


    render(){
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

        return(
            <Modal show onHide={this.props.onHide}>
                <Form onSubmit={this.handleRedeemPoints}>
                    <Modal.Header closeButton className="modal-title">
                        <Modal.Title>Redeem Points</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            <Form.Group style={{"textAlign": "center"}}>
                                {/* <label className="control-label" style={{"textAlign": "center"}}>Quantity:</label> */}
                                
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    className="select"
                                    onChange={(input) => {this.setState({showRedeemButton: true}); this._quantity = input}}
                                    placeholder=" Quantity"
                                    ref={(input) => this._quantity = input}/>
                            </Form.Group>
                        : null}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.showRedeemButton ? 
                            <Button variant="info" type="submit">Redeem</Button>
                        :null}
                        <Button variant="default" type="button" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

RedeemPoints.propTypes = {
    id: PropTypes.string,
    onRedeemPoints: PropTypes.func,
    onHide: PropTypes.func
}

export default RedeemPoints;