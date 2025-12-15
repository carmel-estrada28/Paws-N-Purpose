




import "../Projects/DonationBox.css"






export default function DonationBox({ donationBox, onView, onDonate, donationBoxTitle, yourDonationBox=false, hasMaxWidth=false}) {
    return (
        <div 
            className="DonationBox"
            style={ hasMaxWidth ? {
                maxWidth: "20.1rem"
            } : {

            }}
        >
            <div 
                className="DonationBox_image-container"
                style={{
                    // border: "1px solid #ff0000ff"
                }}
            >
                <img 
                    className="DonationBox_image"
                    src={donationBox.donationBoxPhoto}
                    style={{ objectFit: "cover" }}
                    // src={DonationBox.image} 
                    // alt={DonationBox.title}
                />

                <div className="DonationBox_tag">
                    { yourDonationBox ? 
                        <p style={{ fontSize: "0.8rem", color: "#DD4391", backgroundColor: "#fff", borderRadius:"100rem", padding:"0.3rem 0.9rem"}}>Your Donation Box</p>
                    : 
                        <p style={{ fontSize: "0.8rem", color: "#ffffffff", backgroundColor: "#DD4391", borderRadius:"100rem", padding:"0.3rem 0.9rem" }}>Donation Box</p>
                    }
                    
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
                    >{donationBox.title}</p>
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
                    >{donationBox.description}</p>
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
                    <p><span style={{ color: "#000" }}>${donationBox.fundsRaised}</span> of ${donationBox.goalAmount}</p>
                </div>
                
                
            </div>

            
        </div>
    );
}