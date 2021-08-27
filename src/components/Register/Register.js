import React, { useState } from "react";

function Register({onRouteChange, loadUser}) {
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    function onRegisterNameChange(event) {
        setRegisterName(event.target.value)
    }

    function onRegisterEmailChange(event) {
        setRegisterEmail(event.target.value)
    }

    function onRegisterPasswordChange(event) {
        setRegisterPassword(event.target.value)
    }

    function onSubmitRegister() {
        fetch("https://protected-bayou-93584.herokuapp.com/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassword
            })
        }).then(response => response.json()).then(user => {
            if (user.id){
                loadUser(user);
                onRouteChange("home");
            }
        })
    }

    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                onChange={onRegisterNameChange}
                                type="text" 
                                name="name"  
                                id="name"
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                onChange={onRegisterEmailChange}
                                type="email" 
                                name="email-address"  
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                onChange={onRegisterPasswordChange}
                                type="password" 
                                name="password"  
                                id="password"
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Register;