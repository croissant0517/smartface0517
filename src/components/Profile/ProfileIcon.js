import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const ProfileIcon = ({onRouteChange, toggleModal}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const noRefCheck = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div className="pa4 tc" >
            <Dropdown isOpen={dropdownOpen} toggle={noRefCheck}>
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="span"
                >
                    <div className="pa1 tc" style={{ cursor: "pointer" }}>
                        <img 
                            src="http://tachyons.io/img/logo.jpg" 
                            className="br-100 ba h3 w3 dib" 
                            alt="avatar" 
                        />
                    </div>
                </DropdownToggle>
                <DropdownMenu className="shadow-5" style={ {backgroundColor: "rgba(255, 255, 255, 0.7)"} }>
                    <DropdownItem onClick={() => toggleModal()} >
                        Profile
                    </DropdownItem>
                    <DropdownItem onClick={() => {
                        onRouteChange("signout")
                        window.localStorage.removeItem('token');
                    }} >
                        Sign out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

        </div>
    );
}

export default ProfileIcon;