import React, {useState} from 'react'
import {FaArrowCircleUp} from 'react-icons/fa';
import '../assets/scrollTop.scss';

function ScrollTop() {
    const [showScroll, setShowScroll] = useState(false);
    
    const checkScrollTop = () => {    
        if (!showScroll && window.pageYOffset > 50)
            setShowScroll(true);
        else if (showScroll && window.pageYOffset <= 50)
            setShowScroll(false);
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop);

    return (
        <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'inline' : 'none'}}/>
    )
}

export default ScrollTop
