import { Calculator } from "lucide-react";
import Header from "../../components/Header/Header";
import "./Dashboard.css"
import { Link } from "react-router-dom";
import Campaign from "../../components/Projects/Campaign";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "../../components/Buttons/Button";
import DonationBox from "../../components/Projects/DonationBox";


// carousel component
function Carousel({ headerText, seeAllLink="/dashboard", isDisplayed=false}) {


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

      // set scroll steps
    useEffect(() => {
      if (!scrollContainerRef.current) return;

      const scrollContainer = scrollContainerRef.current;
      
      const cards = Array.from(itemsContainerRef.current.children);

      const nextCard = [...cards].find(card => card.offsetLeft + card.clientWidth > scrollContainer.scrollLeft + scrollContainer.clientWidth);

      if (nextCard) {
        scrollStepRef.current = nextCard.offsetLeft - paddingLeft;
      }

    }, [])

      // setting arrow behavior
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

      // setting the filler space
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
            display: `${ isDisplayed ? "flex" : "none" }`
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
                fontSize: "1.9rem"
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

                <Campaign campaignTitle={"Campaign Dummy"} />
                <DonationBox donationBoxTitle={"Donation Box Dummy"} />
                <Campaign campaignTitle={"Campaign Dummy"} />
                <DonationBox donationBoxTitle={"Donation Box Dummy"} />

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
  
  // useStates
  const [hasDonated, setHasDonated] = useState(false)
  const [hasProjects, setHasProjects] = useState(false)



  




















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

        <p 
          style={{
            fontSize: "3rem",
            fontFamily: "Cherry Bomb One",
            margin: "1.5rem 3rem 1rem 3rem",
            // border: "1px solid red"
          }}
        >Home</p>

        <div 
          className="Dashboard_explore"
          style={{
            // border: "1px solid #134affff"
          }}
        >

          {/* My Projects */}
          <Carousel headerText={"Manage your projects"}/>

          {/* Donate again */}
          <Carousel headerText={"Donate again"}/>

          {/* Featured Campaigns */}
          <Carousel headerText={"Featured Campaigns"} isDisplayed={true}/>

          {/* Donation Boxes */}
          <Carousel headerText={"Featured Donation Boxes"} isDisplayed={true}/>

        </div>
      </div>

      <div 
        className="Dashboard_bg-container"
        style={{
          position: "fixed",
          overflow: "hidden",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          zIndex: "-1",
          // border: "1px solid red",
        }}
      >
        <svg viewBox="0 0 525 643" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            zIndex: "1",
            marginLeft: "-2rem",
            marginTop: "-1rem",
            width: "27rem",
            height: "27rem",
            position: "absolute",
            top: "0rem",
            left: "0rem"
          }}
        >
          <g filter="url(#filter0_f_1121_359)">
          <circle cx="56" cy="174" r="169" fill="#bbedffff"/>
          </g>
          <defs>
            <filter id="filter0_f_1121_359" x="-413" y="-295" width="938" height="938" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_1121_359"/>
            </filter>
          </defs>
        </svg>

        <svg viewBox="0 0 756 986" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            zIndex: "1",
            marginRight: "-2rem",
            marginTop: "-1rem",
            width: "50rem",
            height: "50rem",
            position: "absolute",
            top: "0rem",
            right: "0rem"
          }}
        >
          <g filter="url(#filter0_f_1218_361)">
            <circle cx="627" cy="359" r="227" fill="#EAEF9F"/>
          </g>
          <g filter="url(#filter1_f_1218_361)">
            <circle cx="423" cy="327" r="105" fill="#BBE7D6"/>
          </g>
          <defs>
            <filter id="filter0_f_1218_361" x="0" y="-268" width="1254" height="1254" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_1218_361"/>
            </filter>
            <filter id="filter1_f_1218_361" x="168" y="72" width="510" height="510" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_1218_361"/>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}