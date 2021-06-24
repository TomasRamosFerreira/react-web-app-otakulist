import React from 'react'
import '../../assets/error.scss';

function fetchEmpty() {
    return (
        <div className="message-box">
            <h1>Seen's like theres nothing here</h1>
            <div className="buttons-con">
                <div className="action-link-wrap">
                    <a href="/" className="link-button">Go to Home Page</a>
                </div>
            </div>
        </div>
    )
}

export default fetchEmpty