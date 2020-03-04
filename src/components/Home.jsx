import React from 'react';
import './Home.scss';

//show how firebase work
import { FirebaseContext } from './Firebase';

const Home = (props) => {
    return (
        <div class="container home">
            {/* <FirebaseContext.Consumer>
                {firebase => {
                    console.log(firebase);
                    return <div>I've access to Firebase and render smthing:</div>
                }}
            </FirebaseContext.Consumer> */}
            <br/>
            <h1>
                Welcome to Kids Points Tracker!
            </h1>
            <p>This is application that helps you to track points earned by children. You can assign different categories, have multiple items inside your categories and assign different amount of points for doing this items. You can track points for multiple children. You can continue track your points even during vacation. At least if you access to Internet!</p>
            <p>Don't know where to start?</p>
            <p>You can register your account or just start playing without saving data.</p>

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