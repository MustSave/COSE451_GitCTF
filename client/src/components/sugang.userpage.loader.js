import React from "react";
import styled, {keyframes} from "styled-components";

const load = keyframes`
0% {
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}
100% {
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
}
`;
const loading_text = keyframes`
0% {
    opacity: 0;
}
20% {
    opacity: 0;
}
50% {
    opacity: 1;
    color: #a20131;
}
100% {
    opacity: 0;
}
`;

const StyledDiv = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    text-align: center;
    background: rgba(73, 74, 77, 0.4);
    transition: all 250ms linear;

    .loading-helper {
        /* display: inline-block; */
        height: 100%;
        vertical-align: middle;
        margin-top: 50px;
        margin-left: 50px;
    }
    .loader{
        position: relative;
        display: inline-block;
        text-indent: -9999999em;
        border-radius: 100%;
        width: 80px;
        height: 80px;
        margin-top: 5px;
        border-top: 2px solid transparent;
        border-right: 2px solid #a20131;
        border-bottom: 2px solid transparent;
        border-left: 2px solid #a20131;
        -webkit-animation: ${load} 1.0s infinite linear;
        animation: ${load} 1.0s infinite linear;
    }
    .loading-text {
        position: relative;
        left: -65px;
        top: -33px;
        display: inline-block;
        margin: 0 auto;
        font-family: "Segoe UI","���� ����","Malgun Gothic","���� SD �굹���� Neo","Apple SD Gothic Neo",sans-serif;
        font-weight: 600;
        font-size: 12px;
        color: #a20131;
        text-align: center;
        text-transform: uppercase;
        opacity: 0;
        -webkit-animation: ${loading_text} 1.5s linear 0s infinite normal;
        animation: ${loading_text} 1.5s linear 0s infinite normal;
    }
`;

export default function Loader() {
    // console.log('Call Loader');
    return(
        <StyledDiv className="wrap-loader hidden">
            <span className="loading-helper"/>
            <div className="loader"></div>
            <div className="loading-text">Loading</div>
        </StyledDiv>
    )
}