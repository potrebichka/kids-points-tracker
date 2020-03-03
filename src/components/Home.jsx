import React from 'react';

//show how firebase work
import { FirebaseContext } from './Firebase';

const Home = (props) => {
    return (
        <div>
            Home
            <FirebaseContext.Consumer>
                {firebase => {
                    console.log(firebase);
                    return <div>I've access to Firebase and render smthing:</div>
                }}
            </FirebaseContext.Consumer>
        </div>
    );
}

export default Home;