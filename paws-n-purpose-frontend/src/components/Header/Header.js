

import "./Header.css";
import Logo from "../Icons/Logo";
import RewardIcon from "../Icons/RewardIcon"
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";



export default function Header({withColor, isLoggedIn, isFixed, logoOnly=false}) {
  return (
    <div 
      className="header_header"
      style={{
        backgroundColor: withColor ? "#78B96C" : "transparent",
        zIndex: "3",
        ...(isFixed ? { position: "fixed", top: "0"} 
        :
        {})
      }}
    >
      <div 
        className="header_inner-layer"
        style={{ backgroundColor: withColor ? "#ffff" : "transparent" }}
      >
        { isLoggedIn ? 
          <>
            <div 
              style={{
                width: "30%",
                display: "flex",
                alignContent: "center"
              }}
            >  
              <Logo/>
            </div>

            { !logoOnly &&
              <div
                className="header_nav-button-group"
                style={{
                  width: "40%",
                  justifyContent: "center",
                  gap: "2.5rem"
                }}
              >
                <Link to={""}>
                  <Button
                    type="button"
                    text="Home"
                    theme={"transparent semi-rounded"}
                  />
                </Link>
                <Link to={""}>
                  <Button
                    type="button"
                    text="Campaigns"
                    theme={"transparent semi-rounded"}
                  />
                </Link>
                <Link to={""}>
                  <Button
                    type="button"
                    text="Start a Campaign"
                    theme={"transparent semi-rounded"}
                  />
                </Link>
              </div>
            
            }
            
            {!logoOnly &&
              <div 
                className="header_nav-button-group"
                style={{
                  width: "30%",
                  justifyContent: "flex-end"
                }}
              >
                <div className="header_nav-button-icon-container messages">
                  <svg className="header_nav-button-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.82641 17.9514C6.94894 18.2605 6.97622 18.5992 6.90474 18.9239L6.01724 21.6656C5.98865 21.8046 5.99604 21.9487 6.03872 22.084C6.0814 22.2194 6.15796 22.3416 6.26113 22.4391C6.3643 22.5366 6.49067 22.6062 6.62824 22.6411C6.76582 22.6761 6.91004 22.6753 7.04724 22.6389L9.89141 21.8072C10.1978 21.7465 10.5152 21.773 10.8072 21.8839C12.5867 22.7149 14.6025 22.8907 16.499 22.3803C18.3955 21.8699 20.0508 20.7061 21.1728 19.0942C22.2948 17.4823 22.8115 15.5259 22.6317 13.5702C22.4518 11.6145 21.587 9.78514 20.1898 8.40491C18.7926 7.02468 16.9528 6.18228 14.9951 6.02633C13.0373 5.87037 11.0874 6.4109 9.48928 7.55253C7.8912 8.69416 6.74769 10.3635 6.26049 12.2661C5.77329 14.1687 5.97372 16.1822 6.82641 17.9514Z" stroke="#053534" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>


                <div
                  className="header_nav-button-icon-container notifs"
                  style={{
                    marginRight: "0.8rem"
                  }}
                >
                  <svg className="header_nav-button-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1116 21.6738C15.3602 21.261 15.911 21.1196 16.3414 21.3581C16.7717 21.5966 16.919 22.1251 16.6705 22.5381C16.4335 22.9316 16.0924 23.2591 15.6822 23.4864C15.2719 23.7135 14.8059 23.8335 14.3322 23.8335C13.8584 23.8334 13.3925 23.7136 12.9822 23.4864C12.5719 23.2591 12.2309 22.9317 11.9939 22.5381C11.7455 22.1253 11.8931 21.5967 12.323 21.3581C12.7534 21.1196 13.3041 21.2609 13.5528 21.6738C13.6317 21.8049 13.7451 21.9148 13.8818 21.9906C14.0185 22.0663 14.1743 22.1059 14.3322 22.1059C14.49 22.1059 14.6459 22.0662 14.7826 21.9906C14.9191 21.9149 15.0327 21.8048 15.1116 21.6738Z" fill="#000000ff"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3311 4.8335C16.0019 4.8335 17.6048 5.47007 18.7862 6.60355C19.9677 7.73725 20.632 9.2751 20.632 10.8784C20.632 12.7306 20.9336 13.8833 21.3291 14.6867C21.6265 15.2906 21.9931 15.7342 22.4102 16.1683L22.8437 16.6045L22.8637 16.6247C23.0984 16.8722 23.2529 17.18 23.3088 17.5103C23.3647 17.8407 23.3191 18.1798 23.178 18.4859C23.0369 18.7919 22.8059 19.0522 22.5136 19.2348C22.2577 19.3945 21.9643 19.4891 21.6614 19.5101L21.5316 19.5141H7.13064C6.78201 19.5138 6.44071 19.4165 6.1487 19.2338C5.85664 19.0508 5.62599 18.7901 5.48529 18.4839C5.3446 18.1776 5.29925 17.8386 5.35556 17.5083C5.4119 17.178 5.56771 16.87 5.80276 16.6227C5.80858 16.6166 5.81469 16.6105 5.82069 16.6045C6.41863 16.0122 6.93666 15.4918 7.33314 14.6867C7.72866 13.8833 8.03136 12.7306 8.03136 10.8784C8.03136 9.27518 8.6957 7.73724 9.8771 6.60355C11.0584 5.47021 12.6607 4.83368 14.3311 4.8335ZM14.3311 6.56003C13.1379 6.56022 11.9928 7.01546 11.1491 7.82508C10.3054 8.63483 9.83175 9.73335 9.83175 10.8784C9.83175 12.9115 9.49858 14.3316 8.96056 15.4245C8.55775 16.2424 8.05533 16.841 7.57783 17.3382L7.13169 17.7876H21.5316C20.938 17.2004 20.2329 16.5032 19.7017 15.4245C19.1636 14.3314 18.8316 12.9114 18.8316 10.8784C18.8316 9.73319 18.3571 8.63487 17.5132 7.82508C16.6693 7.01552 15.5245 6.56003 14.3311 6.56003Z" fill="#000000ff"/>
                  </svg>
                </div>


                <div className="header_rewards">
                  <RewardIcon width={1.5} height={1.5}/>
                  <p 
                    style={{
                      width: "3rem",
                      textAlign: "center"
                    }}
                  >99999</p>
                  <img
                    style={{
                      maxHeight: "100%",
                      borderRadius: "100rem",
                      backgroundColor: "#fff",
                    }}
                    src="/pawsnpurpose-icon.png" 
                    alt="profile-picture"
                  />
                </div>
                
              </div>
            }
            
          </> 
          : // 👈 ELSE 
          <>
            <div 
              style={{
                width: "30%",
                display: "flex",
                alignContent: "center"
              }}
            >  
              <Logo/>
            </div>
            
            { !logoOnly &&
              <div 
                className="header_nav-button-group"
                style={{
                  marginLeft: 'auto',
                  gap: "2.5rem"
                }}
              >
                
                <Link to={"/landing"}>
                  <Button
                    type="button"
                    text="Home"
                    theme={"transparent semi-rounded"}
                  />
                </Link>
                <Link to={""}>
                  <Button
                    type="button"
                    text="About"
                    theme={"transparent semi-rounded"}
                  />
                </Link>
                <Link to={"/login"}>
                  <Button
                    type="button"
                    text="Sign in"
                    hPadding={3}
                    vPadding={0.5}
                    theme={"pink semi-rounded"}
                  />
                </Link>
              </div>
            
            }
            
          </>
        }
        
      </div>
    </div>

  );
}