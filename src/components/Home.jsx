import React from 'react';
import './Home.scss';

const Home = (props) => {
    return (
        <div className="container home">
            <br/>
            <h1>
                Welcome to Kids Points Tracker!
            </h1>
            <p>This is application that helps you to track points earned by children. You can assign different categories, have multiple items inside your categories and assign different amount of points for doing this items. You can track points for multiple children. You can continue track your points even during vacation. At least if you access to Internet!</p>
            <p>Don't know where to start?</p>
            <p>You can register your account or just start playing without saving data.</p>

            <div className="sea">
                <div className="circle-wrapper">
                    <div className="bubble"></div>
                    <div className="submarine-wrapper">
                        <div className="submarine-body">
                            <div className="window"></div>
                            <div className="engine"></div>
                            <div className="light"></div>
                        </div>
                        <div className="helix"></div>
                        <div className="hat">
                        <div className="leds-wrapper">
                            <div className="periscope"></div>
                            <div className="leds"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home