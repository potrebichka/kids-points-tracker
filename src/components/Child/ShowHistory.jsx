import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';

const ShowHistory = (props) => {

    let historyTimeSorted = Object.keys(props.history).slice();
    historyTimeSorted.sort((a,b) => b-a);
    historyTimeSorted = historyTimeSorted.slice(0,10);

    return (
    <div>
        {historyTimeSorted.length !== 0 ?                
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Points</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                {historyTimeSorted.map(id => {
                    return <tbody key={id} className="history-item">
                        <tr>
                            <td>{Moment(parseInt(id)).format('LLL')}</td> 
                            <td>{props.history[id][0]}</td>
                            <td>{props.history[id][1]}</td>
                            <td>{props.history[id][2]}</td>
                            <td>{props.history[id][3]}</td>
                            <td>{props.history[id][4]}</td>
                        </tr>
                    </tbody>
                })}
            </table>
            : <h4>History is empty</h4>
        }
    </div>);
}

ShowHistory.propTypes = {
    history: PropTypes.object
}

export default ShowHistory;