import React, { useEffect, useState } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from 'react-particles-js';
import Modal from "./components/Modal/Modal";
import Profile from './components/Profile/Profile';
import './App.css';

const particlesOptions = {
  particles: {
    number:{
      value:30,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  
  const[input, setInput] = useState("");
  const[imageUrl, setImageUrl] = useState("");
  const[box, setBox] = useState({});
  const[route, setRoute] = useState("signin");
  const[isSignedIn, setIsSignedIn] = useState(false);
  const[isProfileOpen, setIsProfileOpen] = useState(false);
  const[user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    pet: "",
    age: "",
  });

  function loadUser(user) {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
      pet: user.pet,
      age: user.age,
    })
  }

  function calculateFaceLocation(data) {
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    setBox({
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    })
  }

  function handleInputChang(event) {
    setInput(event.target.value);
  }

  function handleButtonSubmit() {
    const token = window.localStorage.getItem("token")
    setImageUrl(input);
    fetch("https://protected-bayou-93584.herokuapp.com/imageurl", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({
            input: input
          })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch("https://protected-bayou-93584.herokuapp.com/image", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({
            id: user.id
          })
        }).then(response => response.json()).then(count => {
          setUser((prevItems) => {
            return {
              ...prevItems,
              entries: count
            }
          })
        })
        .catch(err => console.log(err))
      }
      calculateFaceLocation(response)})
    .catch(err => console.log(err))
  }

  function handleRouteChange(data) {
    if (data === "signout") {
      setIsSignedIn(false);
      setImageUrl("");
      setBox({});
      setRoute("signin");
    } else if (data === "home") {
      setIsSignedIn(true);
      setRoute(data);
    }
  }

  function toggleModal() {
    setIsProfileOpen(!isProfileOpen);
  }

  useEffect(
    () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        fetch("https://protected-bayou-93584.herokuapp.com/signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        })
          .then((res) => res.json())
          .then((user) => {
            if (user && user.id) {
              loadUser(user)
              handleRouteChange("home");
            }
          })
          .catch((error) => console.log(error))
      }
    }
  , [])

  return (
    <div className="App">
      <Particles
        className="particles" 
        params={particlesOptions}
      />
      <Navigation onRouteChange={handleRouteChange} isSignedIn={isSignedIn} toggleModal={toggleModal}/>
      {
        isProfileOpen 
        && 
        <Modal>
          <Profile 
            isProfileOpen={isProfileOpen} 
            toggleModal={toggleModal}
            user={user}
            loadUser={loadUser}
          />
        </Modal>
      }
      {
        route === "home" ?
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries}/>
          <ImageLinkForm 
            onInputChange={handleInputChang}
            onButtonSubmit={handleButtonSubmit}
          />
          <FaceRecognition 
            boxPosition={box}
            onInputFaceImage={imageUrl}
          />
        </div>
        : (
          route === "signin" 
          ? <Signin onRouteChange={handleRouteChange} loadUser={loadUser}/>
          : <Register onRouteChange={handleRouteChange} loadUser={loadUser}/>
        )  
      }
    </div>
  );
}

export default App;
