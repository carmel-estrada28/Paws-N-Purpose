
import Lottie from "lottie-react";
import "./LoginPage.css";
import lightsAnimation from "../../animations/lights.json";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import AuthForm from "../../components/AuthForm/AuthForm";


export default function LoginPage({ onLogin }) {

  // useNavigates
  const navigate = useNavigate();
  
  // useLocations
  const location = useLocation();

  // useRefs
  const lottieRef = useRef();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const inputRefs = {
    emailInput,
    passwordInput
  }


  // useStates
  const [errors, setErrors] = useState({});

  const [userLoginFormData, setUserLoginFormData] = useState({
          email: "",
          password: "",
      });

  const [isLoading, setIsLoading] = useState(false);


  // useEffects
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);

      lottieRef.current.setDirection(1);
      lottieRef.current.play();
    }
  }, [location.pathname])

  useEffect(() => {
    if(inputRefs.emailInput.current) inputRefs.emailInput.current.focus();
  }, [])


  // functions
  const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLoginFormData((prev) => ({ ...prev, [name]: value}));
    };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const authenticateUser = async (e) => {
    setErrors({})
    setIsLoading(true)

    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/authenticate', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(userLoginFormData),
          credentials: "include"
      });

      const data = await response.json();

      console.log("%cAPI /api/users/authenticate fetched done", "color: green; font-size: 1rem; font-weight: bold;");
      console.log("API response:", data);
      
      if (data.success) {
            
          navigate("/dashboard");

          setIsLoading(false); 

          return
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
    <div className="LoginPage">
      <div className="LoginPage_lottie-container">
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

      <Header withColor={false} isLoggedIn={false}/>
      <div className="LoginPage_login-content">
        <AuthForm 
          mode="login" 
          onChange={handleChange}
          onClick={authenticateUser}
          // onClick={()=>{
          //   setIsLoading(true)

          //   setTimeout(()=>{
          //     setIsLoading(false)
          //   }, 1000)
          // }}
          values={userLoginFormData} 
          errors={errors}
          isLoading={isLoading}
          inputRefs={inputRefs}/>
      </div>
    </div>
    
  );
}