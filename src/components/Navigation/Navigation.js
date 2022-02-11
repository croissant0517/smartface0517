import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

function Navigation({onRouteChange, isSignedIn, toggleModal}) {
    if (isSignedIn === true) {
        return(
            <nav style={{display: "flex", justifyContent:"flex-end"}}>
                <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
            </nav>
        )
    } else if (isSignedIn === false) {
        return(
            <nav style={{display: "flex", justifyContent:"flex-end"}}>
                <a
                onClick={(event) => {
                    event.preventDefault();
                    onRouteChange("signin");
                }} 
                href="/signin" 
                className="f3 link dim black underline pa3 pointer">Sign In</a>
                <a 
                onClick={(event) => {
                    event.preventDefault();
                    onRouteChange("register")
                }} 
                href="/register" 
                className="f3 link dim black underline pa3 pointer">Register</a>
            </nav>
        )
    }
    
}

export default Navigation;