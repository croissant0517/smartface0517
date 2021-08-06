import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({onInputFaceImage, boxPosition}) {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={onInputFaceImage} width="500px" height="auto"/>
                <div 
                    className="bounding-box" 
                    style={{top: boxPosition.topRow, right: boxPosition.rightCol, bottom: boxPosition.bottomRow, left: boxPosition.leftCol}}>
                </div>
            </div>      
        </div>
    );
}

export default FaceRecognition;