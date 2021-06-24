import React from 'react'
import '../../assets/error.scss';

function FetchError() {
    return (
        <div className="message-box">
            <h1>Sory :(</h1>
            <p>Error Fetching data!</p>
            <div className="buttons-con">
                <div className="action-link-wrap">
                    <a href="/" className="link-button">Go to Home Page</a>
                </div>
            </div>
        </div>
    )
}

export default FetchError