

import { Link } from "react-router-dom";
import Card from "../Card/Card";
import FormInput from "../FormInput/FormInput";
import Button from "../Buttons/Button";
import "./AuthForm.css";



export default function AuthForm({mode = "login"}) {
    const isLogin = mode === "login";

    return (
    <Card>
        <p className="form-header">
            {isLogin ? "Welcome!" : "Create your Account"}
        </p>
        <p className="form-sub-header">
            {isLogin ? "Enter your credentials to log in to your account!" : "Enter your credentials to log in to your account!"}
        </p>
        <form className="login-form">

            <div 
                className="inputs"
                style={isLogin ? {} : { marginBottom: "2.2rem" }}    
            >
                <FormInput type={"email"} placeholder={"Email / Phone number"}/>
                <FormInput type={"password"} placeholder={"•••••"}/>
            </div>
            
            {isLogin && (
                <a className="forgot-password">Having trouble signing in?</a>
            )}

            <Button
                type="submit"
                text={isLogin ? "Log in" : "Sign up"}
                vPadding={0.7}
                hPadding={0}
                theme={"pink semi-rounded"}
            />
        </form>
        <p className="continue-with-label">{isLogin ? "— or continue with —" : "— or sign up with —"}</p>
        <div className="continue-with-buttons">
            <div className="button">
                <svg style={{ width: "1.5rem", height: "1.5rem", marginRight: "0.5rem" }} viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
                </svg>
                <p>Google</p>
            </div>
            <div className="button">
                <svg style={{ width: "1.5rem", height: "1.5rem", marginRight: "0.5rem" }} viewBox="0 0 266.895 266.895" xmlns="http://www.w3.org/2000/svg"><path d="M252.164 266.895c8.134 0 14.729-6.596 14.729-14.73V14.73c0-8.137-6.596-14.73-14.729-14.73H14.73C6.593 0 0 6.594 0 14.73v237.434c0 8.135 6.593 14.73 14.73 14.73h237.434z" fill="#485a96"/>
                    <path d="M184.152 266.895V163.539h34.692l5.194-40.28h-39.887V97.542c0-11.662 3.238-19.609 19.962-19.609l21.329-.01V41.897c-3.689-.49-16.351-1.587-31.08-1.587-30.753 0-51.807 18.771-51.807 53.244v29.705h-34.781v40.28h34.781v103.355h41.597z" fill="#ffffff"/>
                </svg>
                <p>Facebook</p>
            </div>
            <div className="button">
                <svg style={{ width: "2rem", height: "2rem", marginRight: "0.2rem"}} xmlns="http://www.w3.org/2000/svg"
                    aria-label="Microsoft" role="img"
                    viewBox="0 0 512 512"><rect
                    rx="15%"
                    fill="#ffffff"/><path
                    d="M75 75v171h171v-171z" fill="#f25022"/><path
                    d="M266 75v171h171v-171z" fill="#7fba00"/><path
                    d="M75 266v171h171v-171z" fill="#00a4ef"/><path
                    d="M266 266v171h171v-171z" fill="#ffb900"/>
                </svg>
                <p>Microsoft</p>
            </div>
        </div>
        <p className="sign-up-label">
            {isLogin ? (
            <>
                Don't have an account?
                <span><Link to="/register">Sign up</Link></span>
            </>
            ) : (
            <>
                Already have an account?
                <span><Link to="/login">Log in</Link></span>
            </>
            )}
        </p>
    </Card>
  );
}