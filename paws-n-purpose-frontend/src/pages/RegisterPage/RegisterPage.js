



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


  const [userFormData, setUserFormData] = useState({
        email: "",
        password: "",
    });

  const handleChange = (e, setFormData) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

  const registerUser = (e, endpoint, formData, entity) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/user${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(`${ent} saved: `, data);
                alert(`${ent} added successfully!`);
            })
            .catch((err) => console.log("Error: ", err));
    };

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