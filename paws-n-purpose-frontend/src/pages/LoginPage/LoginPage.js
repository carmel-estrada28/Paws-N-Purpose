


import Lottie from "lottie-react";
import "./LoginPage.css";
import lightsAnimation from "../../animations/lights.json";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import AuthForm from "../../components/AuthForm/AuthForm";




export default function LoginPage({ onLogin }) {
  const lottieRef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);

      lottieRef.current.setDirection(1);
      lottieRef.current.play();
    }
  }, [location.pathname])

  
  return (
    <div style={{
      position: "relative",
      overflow: "hidden"
    }}>
      <Lottie 
        animationData={lightsAnimation}
        loop={false}
        lottieRef={lottieRef}
        style={{
          width: "85rem", 
          height: "85rem", 
          position: "absolute",
          marginTop: "-14rem",
          marginLeft: "-10rem",
          zIndex: "-1"
        }}
      />

      <Header withColor={false} isLoggedIn={false}/>
      <div className="login-content">
        <AuthForm mode="login"/>
      </div>
    </div>
    
  );
}