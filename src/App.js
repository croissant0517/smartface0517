import React, { useState } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "tachyons";
import Particles from 'react-particles-js';
import Clarifai from "clarifai";
import './App.css';

const app = new Clarifai.App({
  apiKey: "7554a6da794343bda25acabd7e768aa1"
})

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
    setImageUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(response => calculateFaceLocation(response))
    .catch(err => console.log(err))
  }

  function handleRouteChange(data) {
    if (data === "signout") {
      setIsSignedIn(false);
    } else if (data === "home") {
      setIsSignedIn(true);
    }
    setRoute(data);
  }

  return (
    <div className="App">
      <Particles
        className="particles" 
        params={particlesOptions}
      />
      <Navigation onRouteChange={handleRouteChange} isSignedIn={isSignedIn}/>
      {
        route === "home" ?
        <div>
          <Logo />
          <Rank />
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
          ? <Signin onRouteChange={handleRouteChange}/>
          : <Register onRouteChange={handleRouteChange}/>
        )  
      }
    </div>
  );
}

export default App;
