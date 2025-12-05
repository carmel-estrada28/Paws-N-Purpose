

import Button from "../Buttons/Button";
import "./CarouselCampaignCard.css";






export default function CarouselCampaignCard({ campaign, onView, onDonate, campaignTitle, myCampaign=false }) {
    return (
        <div 
            className="CarouselCampaignCard"
        >
            <div 
                className="CarouselCampaignCard_image-container"
                style={{
                    // border: "1px solid #ff0000ff"
                }}
            >
                <img 
                    className="CarouselCampaignCard_image"
                    // src={campaign.image} 
                    // alt={campaign.title}
                />

                <div className="CarouselCampaignCard_lift-gradient"/>

                <p
                    className="CarouselCampaignCard_title"
                >
                    {campaignTitle}
                </p>
            </div>

            <div
                className="CarouselCampaignCard_preview-info"
                style={{
                    // border: "1px solid red"
                }}
            >
                
                <div 
                    className="CarouselCampaignCard_progress-metric"
                >
                    <p style={{ fontSize: "0.9rem"}}>$1,700 / $10,000</p>

                    <div
                        className="CarouselCampaignCard_progress-bar"
                    >
                        <div className="CarouselCampaignCard_current-progress"/>
                    </div>
                </div>
                

                <div 
                    className="CarouselCampaignCard_buttons"
                    style={{
                        // border: "1px solid red"
                    }}
                >
                    <Button 
                        type="button"
                        text={"View"}
                        theme={"pink-ripple full-rounded"}
                        height={"2.2rem"}
                        width={"100%"}
                        hasRippleEffect={true}
                        rippleEffectTheme={"light"}
                    />

                    {!myCampaign &&
                        <Button 
                            type="button"
                            text={"Donate"}
                            theme={"grey-ripple full-rounded"}
                            height={"2.2rem"}
                            width={"100%"}
                            hasRippleEffect={true}
                            rippleEffectTheme={"dark"}
                        />
                    }
                </div>
            </div>

            
        </div>
    );
}