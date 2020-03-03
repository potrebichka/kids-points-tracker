import React from 'react';
import './Home.scss';

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

            <div class="sea">
                <div class="circle-wrapper">
                    <div class="bubble"></div>
                    <div class="submarine-wrapper">
                        <div class="submarine-body">
                            <div class="window"></div>
                            <div class="engine"></div>
                            <div class="light"></div>
                        </div>
                        <div class="helix"></div>
                        <div class="hat">
                        <div class="leds-wrapper">
                            <div class="periscope"></div>
                            <div class="leds"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home