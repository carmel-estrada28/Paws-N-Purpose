




import "../Projects/DonationBox.css"






export default function DonationBox({ donationBox, onView, onDonate, donationBoxTitle, myDonationBox=false }) {
    return (
        <div 
            className="DonationBox"
        >
            <div 
                className="DonationBox_image-container"
                style={{
                    // border: "1px solid #ff0000ff"
                }}
            >
                <img 
                    className="DonationBox_image"
                    src="https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg"
                    style={{ objectFit: "cover" }}
                    // src={DonationBox.image} 
                    // alt={DonationBox.title}
                />

                <div className="DonationBox_tag">
                    <p style={{ fontSize: "0.8rem", color: "#DD4391" }}>Donation Box</p>
                </div>

            </div>

            <div
                className="DonationBox_preview-info"
                style={{
                    // border: "1px solid red"
                }}
            >

                <div className="DonationBox_preview-info-1">
                    <p
                        style={{
                            fontFamily: "Cherry Bomb One",
                            letterSpacing: "-0.05rem",
                            fontSize: "1.2rem",
                        }}
                    >Donation Box Dummy</p>
                </div>
                
                
                <div className="DonationBox_preview-info-2">
                    <p
                        style={{
                            color: "#6F6F6F",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: "2",
                            overflow: "hidden",
                        }}
                    >Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...</p>
                </div>

                <div 
                    className="DonationBox_preview-info-3"
                    style={{
                        // border: "1px solid red"

                    }}
                >
                    <div className="DonationBox_progress-bar">
                        <div className="DonationBox_progress" />
                    </div>
                </div>

                <div className="DonationBox_preview-info-4">
                    <p><span style={{ color: "#000" }}>$3,200</span> of $5,000</p>
                </div>
                
                
            </div>

            
        </div>
    );
}