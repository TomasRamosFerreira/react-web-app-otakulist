import React from 'react'
import '../../../assets/error.scss';

function FetchError() {
    return (
        <div>
            <div className="message-box">
                <h1>404</h1>
                <p>Page not found</p>
                <div className="buttons-con">
                    <div className="action-link-wrap">
                        <a href="/" className="link-button">Go to Home Page</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FetchError