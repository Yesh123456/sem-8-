import React from "react";
import Lottie from "react-lottie";
import { useState, useEffect } from "react";

export default function CustomLottie({ lotti }) {
    const [widthHeight, setWidthHeight] = useState(500);

    useEffect(() => {
        if( window.screen.width <= 600 ){
            setWidthHeight(350)
        }
    }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lotti
    };

    return (
        <>
        <Lottie 
            options={defaultOptions} 
            height={widthHeight} 
            width={widthHeight} 
        />
        </>
    );
}