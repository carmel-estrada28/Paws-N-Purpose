import Header from "../../components/Header/Header";
import "./ProfilePage.css"
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import Campaign from "../../components/Projects/Campaign";
import DonationBox from "../../components/Projects/DonationBox";


export default function ProfilePage() {
  
  // useStates


  // useRefs


  // useEffects



  // functions










  return (
    <div 
      className="ProfilePage"
      style={{
        border: "1px solid #ca0000ff"
      }}
    >

      <Header withColor={true} isLoggedIn={true}/>
      
      <div 
        className="ProfilePage_main-content"
        style={{
        //   border: "1px solid rgba(183, 0, 255, 1)"
        }}  
      >

        <Card padding="2rem" borderRadius="1rem">

            <div 
                style={{
                    display: "flex",
                    height:"12rem",
                    gap:"2rem"
                }}  
            >

                <div
                    style={{
                        // border:"1px solid #00fd93ff",
                        display:"flex",
                        flexDirection:"column"
                    }}
                >
                    <div 
                        className="ProfilePage_profile-picture-container"
                        style={{
                            // border:"1px solid #00cc99ff",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >   

                        <p style={{fontSize:"300%", position:"absolute", top: "50%", left:"50%", transform: "translate(-50%, -50%)", color:"#fff", zIndex:"1" }}>JD</p>

                        {/* <svg style={{ height: "2rem", width:"2rem", position:"absolute", top: "50%", left:"50%", transform: "translate(-50%, -50%)" }} xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" >
                            <path d="M17.721,3,16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L6.279,3Z"/><circle cx="12" cy="14" r="4"/><path d="M19,5H5a5.006,5.006,0,0,0-5,5v9a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10A5.006,5.006,0,0,0,19,5ZM12,20a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,20Z"/>
                        </svg> */}

                        <img 
                            style={{backgroundColor:"#5500c4ff"}}
                            // src="https://i.pinimg.com/736x/f3/74/3d/f3743ded43fb43982e0d819e51b52134.jpg"
                        />

                    </div>
                </div>

                <div
                    style={{
                        // border:"1px solid #890bffff",
                        width:"100%",
                        display:"flex",
                        flexDirection:"column"
                    }}
                >
                    <div
                        style={{
                            // border:"1px solid #0037ffff",
                            paddingBottom:"1rem",
                            borderBottom: "1px solid #cdcdcdff",
                            height:"65%",
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"center",
                            gap:"0.3rem"
                        }}
                    >
                        <p
                            style={{fontSize:"1.5rem", fontWeight:"bolder"}}
                        >John Doe</p>

                        <p
                            style={{fontSize:"1rem", color: "#3f3f3fff"}}
                        >@johndoe</p>

                        <p
                            style={{fontSize:"1rem", color: "#7f7f7fff"}}
                        >Joined in 2024</p>
                    </div>

                    <div
                        style={{
                            // border:"1px solid #1fb800ff",
                            height:"35%",
                            display:"flex",
                            gap:"1rem",
                            paddingTop:"1rem"
                        }}
                    >
                        <div
                            style={{
                                // border:"1px solid #ff23c4ff",
                                width:"150%",
                                display:"flex",
                                gap:"1rem"
                            }}
                        >
                            <div
                                style={{
                                    // border:"1px solid #4400c2ff",
                                    width:"2rem",
                                    display:"flex",
                                    alignItems:"center"
                                }}
                            >

                                <div
                                    style={{
                                        width:"2rem",
                                        height:"2rem",
                                        backgroundColor: "#eeeeeeff",
                                        borderRadius:"0.7rem",
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}
                                >
                                    <svg style={{width:"1rem", height:"1rem"}} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                        <path d="M21.793,4c-.112-.319-.378-.559-.706-.639-.172-.042-4.257-1.025-9.087-1.025-4.744,0-8.907,.982-9.082,1.024-.333,.08-.601,.323-.712,.646-.049,.143-1.206,3.536-1.206,7.994s1.156,7.852,1.206,7.994c.112,.324,.383,.568,.717,.646,.178,.042,4.42,1.023,9.078,1.023,4.819,0,8.914-.983,9.086-1.025,.33-.08,.596-.322,.708-.643,.049-.141,1.206-3.51,1.206-7.996,0-4.525-1.158-7.86-1.207-8Zm-9.793,.336c3.591,0,6.82,.589,8.067,.848,.069,.241,.156,.561,.247,.949-.56,.591-1.981,2.025-3.959,3.551-1.642,1.267-3.499,2.381-4.355,2.875-.856-.494-2.71-1.606-4.356-2.876-1.973-1.521-3.39-2.951-3.954-3.545,.091-.388,.177-.71,.246-.953,1.264-.259,4.527-.849,8.064-.849Zm8.064,14.479c-1.251,.26-4.483,.848-8.064,.848-3.472,0-6.785-.593-8.066-.852-.304-1.072-.934-3.668-.934-6.812,0-1.265,.103-2.444,.246-3.471,.77,.742,1.851,1.716,3.177,2.739,2.338,1.804,4.986,3.258,5.098,3.319,.15,.082,.315,.123,.48,.123s.33-.041,.479-.123c.112-.061,2.76-1.515,5.098-3.319,1.329-1.025,2.411-2.001,3.182-2.743,.14,1.021,.241,2.198,.241,3.475,0,3.152-.631,5.748-.936,6.815Z"/>
                                    </svg>

                                </div>
                                

                            </div>

                            <div
                                style={{
                                    // border:"1px solid #4400c2ff",
                                    width:"100%",
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"center"
                                }}
                            >
                                <p style={{color:"#7f7f7fff"}}>Email</p>
                                <p>l**********@gmail.com</p>

                            </div>
                        </div>



                        <div
                            style={{
                                // border:"1px solid #ff23c4ff",
                                width:"100%",
                                display:"flex",
                                gap:"1rem"
                            }}
                        >
                            <div
                                style={{
                                    // border:"1px solid #4400c2ff",
                                    width:"2rem",
                                    display:"flex",
                                    alignItems:"center"
                                }}
                            >

                                <div
                                    style={{
                                        width:"2rem",
                                        height:"2rem",
                                        backgroundColor: "#eeeeeeff",
                                        borderRadius:"0.7rem",
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}
                                >
                                    <svg style={{width:"1rem", height:"1rem"}} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                        <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.657,7H17.431A19.675,19.675,0,0,0,14.6,2.342,10.041,10.041,0,0,1,20.657,7ZM16.5,12a10.209,10.209,0,0,1-.473,3H7.973A10.209,10.209,0,0,1,7.5,12a10.209,10.209,0,0,1,.473-3h8.054A10.209,10.209,0,0,1,16.5,12ZM8.774,17h6.452A19.562,19.562,0,0,1,12,21.588,19.562,19.562,0,0,1,8.774,17Zm0-10A19.562,19.562,0,0,1,12,2.412,19.562,19.562,0,0,1,15.226,7ZM9.4,2.342A19.7,19.7,0,0,0,6.569,7H3.343A10.041,10.041,0,0,1,9.4,2.342ZM2.46,9H5.892a11.676,11.676,0,0,0,0,6H2.46a10.013,10.013,0,0,1,0-6Zm.883,8H6.569A19.675,19.675,0,0,0,9.4,21.658,10.041,10.041,0,0,1,3.343,17ZM14.6,21.658A19.7,19.7,0,0,0,17.431,17h3.226A10.041,10.041,0,0,1,14.6,21.658ZM21.54,15H18.108a11.676,11.676,0,0,0,0-6H21.54a10.013,10.013,0,0,1,0,6Z"/>
                                    </svg>

                                </div>


                            </div>

                            <div
                                style={{
                                    // border:"1px solid #4400c2ff",
                                    width:"100%",
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"center"
                                }}
                            >
                                <p style={{color:"#7f7f7fff"}}>Country</p>
                                <p>Philippines</p>

                            </div>
                        </div>




                        <div
                            style={{
                                // border:"1px solid #ff23c4ff",
                                width:"100%",
                                display:"flex",
                                flexDirection:"column",
                                justifyContent:"center"
                            }}
                        >
                            <p style={{color:"#7f7f7fff"}}>Total Donations</p>
                            <p>2</p>
                        </div>




                        <div
                            style={{
                                // border:"1px solid #ff23c4ff",
                                width:"100%",
                                display:"flex",
                                flexDirection:"column",
                                justifyContent:"center"
                            }}
                        >
                            <p style={{color:"#7f7f7fff"}}>Saved Projects</p>
                            <p>16</p>
                        </div>
                        

                    </div>
                </div>
            </div>
        </Card>

        <Card padding="0rem" borderRadius="1rem">
            
            <p
                className="ProfilePage_header"
                // style={{border:"1px solid #8600aeff"}}
            >
                Saved Projects
            </p>

            <div className="ProfilePage_saved-projects">
                <Campaign />
                <Campaign />
                <Campaign />
                <Campaign />
                <Campaign />
                <Campaign />
                <Campaign />
                <DonationBox/>
                <DonationBox/>
                <DonationBox/>
                <DonationBox/>
                <DonationBox/>
                <DonationBox/>
                <DonationBox/>
            </div>

        </Card>
        
      </div>
    </div>
  )
}