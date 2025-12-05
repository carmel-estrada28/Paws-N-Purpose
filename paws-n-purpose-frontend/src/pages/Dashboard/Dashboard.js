import { Calculator } from "lucide-react";
import Header from "../../components/Header/Header";
import "./Dashboard.css"
import RewardIcon from "../../components/Icons/RewardIcon";
import { Link } from "react-router-dom";
import CarouselCampaignCard from "../../components/CampaignCards/CarouselCampaignCard";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "../../components/Buttons/Button";


// carousel component
function Carousel({ headerText, seeAllLink="/dashboard", myCampaigns=false}) {


    // useStates
    const [extraRightPadding, setExtraRightPadding] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [showArrows, setShowArrows] = useState(false);

    // useRefs
    const scrollContainerRef = useRef(null);
    const itemsContainerRef = useRef(null);
    const scrollStepRef = useRef(0);
    const isScrollingRef = useRef(false);

    // constant variables
    const paddingLeft = 48;

    // useEffects
    useEffect(() => {
      if (!scrollContainerRef.current) return;

      const scrollContainer = scrollContainerRef.current;
      
      const cards = Array.from(scrollContainer.children[0].children);

      const nextCard = [...cards].find(card => card.offsetLeft + card.clientWidth > scrollContainer.scrollLeft + scrollContainer.clientWidth);

      if (nextCard) {
        scrollStepRef.current = nextCard.offsetLeft - paddingLeft;
      }

    }, [])

    useEffect(() => {
      const el = scrollContainerRef.current;
      if (!el) return;

      function updateScrollArrows() {
        const maxScroll = el.scrollWidth - el.clientWidth;

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < maxScroll);
      }

      updateScrollArrows();              // run once initially

      el.addEventListener("scroll", updateScrollArrows);
      return () => el.removeEventListener("scroll", updateScrollArrows);
    }, []);


    // useLayoutEffects
    useLayoutEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const cardWidth = itemsContainerRef.current.children[0].clientWidth;
      console.log(`Card width: ${cardWidth}px`);
      const containerWidth = scrollContainer.clientWidth;
      console.log(`Container width: ${containerWidth}px`);
      const scrollWidth = scrollContainer.scrollWidth;
      console.log(`Scroll width: ${scrollWidth}px`);

        // How much is leftover after full batches
      const leftover = scrollWidth % scrollStepRef.current;


        // The phantom card must fill the missing space
      const extraRightPadding =
        leftover === 0 ? 0 : containerWidth - leftover;

      console.log(`Extra right padding: ${extraRightPadding}px`);
      setExtraRightPadding(extraRightPadding)

    }, [])

  

    
    

    // functions

    const onClickRightArrow = () => {
      if (!scrollContainerRef.current) return;
      console.log("Right arrow clicked!");

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      const scrollContainer = scrollContainerRef.current;
      

      const currentScrollPosition = scrollContainer.scrollLeft;

      const newScrollLeft = currentScrollPosition + scrollStepRef.current;
      
      scrollContainer.scrollTo({
        left: newScrollLeft
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);

      console.log(`Scrolled right to ${newScrollLeft} / ${scrollContainer.scrollWidth}`);
    }

    const onClickLeftArrow = () => {
      if (!scrollContainerRef.current) return;
      console.log("Left arrow clicked!");

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      const scrollContainer = scrollContainerRef.current;

      const currentScrollPosition = scrollContainer.scrollLeft; 

      const newScrollLeft = Math.max(currentScrollPosition - scrollStepRef.current, 0);

      scrollContainer.scrollTo({
        left: newScrollLeft,
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);

      console.log(`Scrolled left to ${newScrollLeft} / ${scrollContainer.scrollWidth}`);
    };






    return (
        <div 
          className="Dashboard_campaigns"
          style={{
            // border: "1px solid #d1a400ff"
          }}
        > 

          <div 
            className="Dashboard_header"
            style={{
              // border: "1px solid #a3c800ff"
            }}
          >

            <p 
              style={{
                // border: "1px solid #00b0c7ff",
                fontFamily: "Cherry Bomb One",
                fontSize: "1.5rem"
              }}
            >{headerText}</p>

            <Link 
              className="Dashboard_seeAll"
              to={seeAllLink}
              style={{
                // border: "1px solid #00b0c7ff",
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              
              <p 
                style={{
                  // border: "1px solid #fc0082ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >see all</p>

              <svg style={{ width: "1.5rem", height: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z"/>
              </svg>

            </Link>
          </div>

          <div
            className="Dashboard_carousel"
            style={{
              // border: "1px solid #a3c800ff"
            }}
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
          >

            <button 
              className={`Dashboard_arrow-btn Dashboard_arrow-left ${showArrows && canScrollLeft ? "visible":"invisible"}`}
              style={{
                width: "3rem", 
                height: "3rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                left: "2rem"
              }}
              onClick={onClickLeftArrow}
            >

              <svg style={{ width: "3.5rem", height: "3.5rem", fill: "#fff" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g id="_01_align_center" data-name="01 align center">
                  <path d="M13.775,18.707,8.482,13.414a2,2,0,0,1,0-2.828l5.293-5.293,1.414,1.414L9.9,12l5.293,5.293Z"/>
                </g>
              </svg>

            </button>
    
            
            <button 
              className={`Dashboard_arrow-btn Dashboard_arrow-right ${showArrows && canScrollRight ? "visible":""}`}
              style={{ 
                width: "3rem", 
                height: "3rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                right: "2rem"
              }}
              onClick={onClickRightArrow}
            >

              <svg style={{ width: "3.5rem", height: "3.5rem", fill: "#fff" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="_01_align_center" data-name="01 align center">
                <path d="M10.811,18.707,9.4,17.293,14.689,12,9.4,6.707l1.415-1.414L16.1,10.586a2,2,0,0,1,0,2.828Z"/></g>
              </svg>


            </button>
              
            <div 
              className="Dashboard_carousel-container"
              ref={scrollContainerRef}
              style={{
                // border: "1px solid rgba(255, 0, 132, 1)"
              }}
            >
              <div
                className="Dashboard_carousel-items"
                ref={itemsContainerRef}
                style={{
                  paddingRight: `${extraRightPadding}px`,
                  // border: "1px solid #3700ffff"
                }}
              >
                <CarouselCampaignCard campaignTitle={"Card 1"} myCampaign={myCampaigns} />
                <CarouselCampaignCard campaignTitle={"Card 2"} myCampaign={myCampaigns} />
                <CarouselCampaignCard campaignTitle={"Card 3"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 4"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 5"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 6"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 7"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 8"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 9"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 10"}  myCampaign={myCampaigns}  />
                <CarouselCampaignCard campaignTitle={"Card 11"}  myCampaign={myCampaigns}  />
                <button 
                  type="button"
                  className="Carousel_see-all-button"
                  style={{
                    border: "1px solid red"
                  }}
                >
                  <p>see all</p>

                  <svg style={{ width: "1.5rem", height: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z"/>
                  </svg>

                  <div className="Carousel_ripple" />
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default function Dashboard() {




  




















  return (
    <div 
      className="Dashboard"
      style={{
        // border: "1px solid #ca0000ff"
      }}
    >

      <Header withColor={true} isLoggedIn={true}/>
      
      <div 
        className="Dashboard_main-content"
        style={{
          // border: "1px solid rgba(183, 0, 255, 1)"
        }}  
      >

        <div 
          className="Dashboard_profile"
          style={{
            // border: "1px solid #27b500ff",
            backgroundColor: "#fff",
            borderRadius: "1rem",
            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
          }}
        >

          <div 
            className="Dashboard_identity"
            style={{
              // border: "1px solid rgba(44, 255, 2, 1)",
            }}
          >

            <img 
              src="" 
              alt="profile-picture"
              style={{
                margin: "0",
                width: "4.5rem",
                height: "4.5rem",
                borderRadius: "100%",
                backgroundColor: "#828282ff"
              }}
            />
            
            <div 
              className="Dashboard_fullname"
              style={{
                // border: "1px solid red"
              }}
            >
                <p style={{ fontSize: "1.2rem" }}>Full name</p>
                <p style={{ fontSize: "1rem", marginTop: "-0.35rem", color: "#9F9F9F" }}>@nickname</p>
            </div>
          </div>

          <div 
            className="Dashboard_metrics"
            style={{
              // border: "1px solid #ff9900ff"
            }}
          >

            <div 
              className="Dashboard_campaigns-donated"
              style={{
                // border: "1px solid red"
              }}
            >

              <p style={{ display: "flex", alignItems: "center", fontSize: "1.8rem" }}>56</p>
              <p style={{ fontSize: "1rem" }}>Campaigns Donated</p>
            </div>

            <div 
              className="Dashboard_points"
              style={{
                // border: "1px solid red"
              }}
            >

              <div 
                className="Dashboard_points-amount"
                style={{
                  // border: "1px solid #0084ffff"
                }}
              >
                <RewardIcon width={2} height={2}/>
                <p style={{ display: "flex", alignItems: "center", fontSize: "1.8rem" }}>100</p>
              </div>
              <p style={{ fontSize: "1rem" }}>Care Points</p>

            </div>
          </div>
        </div>

        <div 
          className="Dashboard_explore"
          style={{
            // border: "1px solid #134affff"
          }}
        >

          {/* My Campaigns Carousel */}
          <Carousel headerText={"My Campaigns"} myCampaigns={true} />

          {/* Single-Pets Carousel */}
          <Carousel headerText={"Single-pet Campaigns"}/>

          {/* Multi-Pets Carousel */}
          <Carousel headerText={"Multi-pet Campaigns"}/>

        </div>
      </div>

      <div 
        className="Dashboard_bg-container"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "-1",
          // border: "1px solid red",
        }}
      >

      </div>
    </div>
  );
}