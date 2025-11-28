



import Lottie from "lottie-react";
import "./RegisterPage.css";
import lightsAnimation from "../../animations/lights.json";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderBeforeLogin from "../../components/Header/Header";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function RegisterPage() {
  // useNavigates
  const navigate = useNavigate();

  // useRefs
  const lottieRef = useRef();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const inputRefs = {
    emailInput,
    passwordInput
  }

  // useLocations
  const location = useLocation();

  // useStates
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [userFormData, setUserFormData] = useState({
        email: "",
        password: "",
    });

  // useEffects
  useEffect(() => {
    if(inputRefs.emailInput.current) inputRefs.emailInput.current.focus();
  }, [])

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(lottieRef.current.getDuration(true), true);
      
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
    }
  }, [location.pathname])

  // functions
  const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prev) => ({ ...prev, [name]: value}));
    };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const registerUser = async (e) => {
    setErrors({})
    setIsLoading(true)

    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(userFormData),
          credentials: "include"
      });

      const data = await response.json();

      console.log("%cAPI /api/users/register fetched done", "color: green; font-size: 1rem; font-weight: bold;");
      console.log("API response:", data);
      
      if (data.success) {
          setIsTransitioning(true)
          console.log("API response:", data);

          await delay(800);
          setIsTransitioning(false)
          navigate("/account-setup");

          return;
      } else {

          await delay(1000);
          setIsLoading(false);

          console.log('Errors found:', data.errors);

          const formatted = {};
          Object.entries(data.errors || {}).forEach(([field, errorsArray]) => {
              formatted[field] = errorsArray.map(errObj => errObj.message);
          });

          emailInput.current.focus();
          setErrors(formatted);
      }
    } catch (err) {
          console.log("Error: ", err);
          
          setIsLoading(false);
    }
  }

    


  

  return (
    <div className="RegisterPage">
      <div className="RegisterPage_lottie-container">
        <Lottie 
        animationData={lightsAnimation}
        loop={false}
        lottieRef={lottieRef}
        style={{
          position: "absolute",
          width: "85rem", 
          height: "85rem",
          marginTop: "-14rem",
          marginLeft: "-10rem"
        }}
      />
      </div>

      
        <HeaderBeforeLogin withColor={false} isLoggedIn={false}/>
        <div className="RegisterPage_register-content">
          <AuthForm 
            mode="register" 
            onChange={handleChange}
            onClick={registerUser}
            values={userFormData} 
            isLoading={isLoading}
            errors={errors}
            inputRefs={inputRefs}/>
        </div>
        <div className={`RegisterPage_fade-overlay ${isTransitioning ? "active" : ""}`}/>
    </div>
    
  );
}