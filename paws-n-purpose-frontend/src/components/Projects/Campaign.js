

import Button from "../Buttons/Button";
import "../Projects/Campaign.css"
import { Calendar } from 'lucide-react';






export default function Campaign({ campaign, onView, onDonate, campaignTitle, myCampaign=false }) {
    return (
        <div 
            className="Campaign"
        >
            <div 
                className="Campaign_image-container"
                style={{
                    // border: "1px solid #ff0000ff"
                }}
            >
                <img 
                    className="Campaign_image"
                    src="https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg"
                    style={{ objectFit: "cover" }}
                    // src={campaign.image} 
                    // alt={campaign.title}
                />

                <div className="Campaign_tag">
                    <p style={{ fontSize: "0.8rem", color: "#fff" }}>Campaign</p>
                </div>

                <div className="Campaign_lift-gradient"/>

                <div className="Campaign_description"> 
                    <p
                        style={{
                            fontFamily: "Cherry Bomb One",
                            fontSize: "1.2rem"
                        }}
                    >
                        {campaignTitle}
                    </p>
                    <p
                        style={{
                            fontSize: "0.8rem",
                            wordBreak: "break-word"
                        }}
                    >
                        Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...
                    </p>
                </div>
            </div>

            <div
                className="Campaign_preview-info"
                style={{
                    // border: "1px solid red"
                }}
            >
                
                <div 
                    className="Campaign_preview-info-1"
                    style={{
                        // border: "1px solid red"
                    }}
                >
                    <Calendar size={17} />
                    <p 
                        style={{
                            marginLeft: "0.5rem"
                        }}
                    ><span>2</span> Donation Boxes</p>
                    <p
                        style={{
                            marginLeft: "auto"
                        }}
                    >Target Date: June 26, 2028</p>
                </div>

                <div 
                    className="Campaign_preview-info-2"
                    style={{
                        // border: "1px solid red"

                    }}
                >
                    <div className="Campaign_progress-bar">
                        <div className="Campaign_progress" />
                    </div>
                </div>

                <div 
                    className="Campaign_preview-info-3"
                    style={{
                        // border: "1px solid red"
                    }}
                >
                    <p><span style={{ color: "#000" }}>$3,200</span> of $5,000</p>
                    <p
                        style={{
                            marginLeft: "auto"
                        }}
                    >34% funded</p>
                </div>
                
            </div>

            
        </div>
    );
}