



import Lottie from "lottie-react";
import "./RegisterPage.css";
import lightsAnimation from "../../animations/lights.json";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderBeforeLogin from "../../components/Header/Header";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function RegisterPage() {
  const lottieRef = useRef();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);


    // para ni sa pag reverse sa animation
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(lottieRef.current.getDuration(true), true);
      
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
    }
  }, [location.pathname])



    // API fetchings!

  

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
        <HeaderBeforeLogin withColor={false} isLoggedIn={false}/>
        <div className="register-content">
          <AuthForm mode="register"/>
        </div>
        <div className={`fade-overlay`}/>
    </div>
    
  );
}