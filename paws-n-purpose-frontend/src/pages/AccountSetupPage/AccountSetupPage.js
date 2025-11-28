



import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../../components/Buttons/Button';
import Card from '../../components/Card/Card';
import './AccountSetupPage.css'
import Header from '../../components/Header/Header';
import FormInput from "../../components/FormInput/FormInput";


export default function AccountSetupPage() {
  
  // useNavigates
  const navigate = useNavigate();
  
  
  // useRefs
  const individualFirstInput = useRef(null);
  const nicknameInput = useRef(null);
  const orgNameInput = useRef(null);
  

  // useStates
  const [selectedUserType, setSelectedUserType] = useState("individual")
  const [individualProfileData, setIndividualProfileData] = useState({
        firstName: "",
        lastName: "",
        nickname: ""
    });
  const [orgProfileData, setOrgProfileData] = useState({
        orgName: ""
  })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [proceed, setProceed] = useState(false)
  const [enableIndividualButton, setEnableIndividualButton] = useState(false)
  const [enableOrgButton, setEnableOrgButton] = useState(false)
  const [errors, setErrors] = useState({});


  // useEffects
  useEffect(() => {
    if(individualFirstInput.current) individualFirstInput.current.focus();
    if(orgNameInput.current) orgNameInput.current.focus();
  }, [proceed])


  useEffect(() => {
    setEnableIndividualButton(individualProfileData.firstName && individualProfileData.lastName && individualProfileData.nickname)
    setEnableOrgButton(orgProfileData.orgName)
  }, [individualProfileData, orgProfileData])


  useEffect(() => {
    setTimeout(() => {
      setIsTransitioning(true)
    }, 800)
  }, [])

  // functions

  const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (["firstName", "lastName", "nickname"].includes(name)) {
          setIndividualProfileData((prev) => ({ ...prev, [name]: value }));
        }

        if (name === "orgName") {
          setOrgProfileData({ orgName: value });
        }
    };

  const selectAUserType = (userType) => {
        setSelectedUserType(userType)

        console.log(`I am an ${userType}`)
    };

  const createUserIndividualProfile = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/users/create-individual-profile', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(individualProfileData),
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("%cAPI /api/users/create-individual-profile fetched done", "color: green; font-size: 1rem; font-weight: bold;")

                console.log(data)

                if (data.success) {
                  console.log("API response:", data);

                  navigate("/dashboard");

                  return;
                } else {
                  console.log('Errors found:', data.errors);
                  nicknameInput.current.focus();

                  const formatted = {};
                  Object.entries(data.errors || {}).forEach(([field, errorsArray]) => {
                    formatted[field] = errorsArray.map(errObj => errObj.message);
                  });
                  setErrors(formatted);
                }
            })
            .catch((err) => console.log("Error: ", err));
    };

  const createUserOrgProfile = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/users/create-org-profile', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orgProfileData),
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("%cAPI /api/users/create-org-profile fetched done", "color: green; font-size: 1rem; font-weight: bold;")

                console.log(data)

                if (data.success) {
                  console.log("API response:", data);

                  navigate("/dashboard");

                  return;
                } else {
                  console.log('Errors found:', data.errors);
                  orgNameInput.current.focus();

                  const formatted = {};
                  Object.entries(data.errors || {}).forEach(([field, errorsArray]) => {
                    formatted[field] = errorsArray.map(errObj => errObj.message);
                  });
                  setErrors(formatted);
                }
            })
            .catch((err) => console.log("Error: ", err));
    };

  return (
    <div 
      className="AccountSetupPage"
      // style={{ border: "1px solid #cf0000ff "}}
    >
        
        <Header logoOnly={true} />
        
        <div 
          className='AccountSetupPage_body'
          // style={{ border: "1px solid #ff8800ff "}}
        >

          {proceed ? (
            selectedUserType === 'individual' ? (
                <div
                  className='AccountSetupPage_content AccountSetupPage_details-content'
                  // style={{ border: "1px solid #ffd900ff "}}
                >
                  <Button 
                    type='button' 
                    text={"Back"} 
                    theme={"green semi-rounded"}
                    vPadding={0.3}
                    hPadding={0}
                    width={"4rem"}
                    onClick={() => setProceed(false)}
                  />

                  <Card card_width={"32rem"}>
                    <div
                      className='AccountSetupPage_individual-details-container'
                      // style={{ border: "1px solid #6aff00ff "}}
                    >

                      <p
                        style={{
                          fontFamily: "Cherry Bomb One",
                          fontSize: "2.2rem",
                          lineHeight:  "2rem",
                          textAlign: "center",
                          // border: "1px solid #00a2ffff"
                        }}>Set your name before you begin</p>
                    
                      <div 
                        className='AccountSetupPage_individual_fields'
                        // style={{ border: "1px solid #00a2ffff" }}  
                      >


                        <div
                          className='AccountSetupPage_individual_fname-lname'
                          // style={{ border: "1px solid #d400d7ff" }}  
                        >
                          <FormInput type={"text"} placeholder={"First name"} name={"firstName"} onChange={handleChange} value={individualProfileData.firstName} inputRef={individualFirstInput} />
                          <FormInput type={"text"} placeholder={"Last name"} name={"lastName"} onChange={handleChange} value={individualProfileData.lastName}/>
                        </div>

                        <FormInput type={"text"} placeholder={"Nickname"} name={"nickname"} inputRef={nicknameInput} onChange={handleChange} value={individualProfileData.nickname} error={errors?.nickname && errors.nickname[0]} />

                      </div>

                      <Button
                        type='submit'
                        text={"Finish"}
                        theme={ enableIndividualButton ? "pink semi-rounded" : "pink-disabled semi-rounded" }
                        vPadding={0.7}
                        hPadding={0}
                        width={"10rem"}
                        onClick={createUserIndividualProfile}
                      />
                    </div>
                  </Card>
                </div>
            )
              : ( // ELSE IF selectedUserType === 'organization'
                <div
                  className='AccountSetupPage_content AccountSetupPage_details-content'
                  // style={{ border: "1px solid #ffd900ff "}}
                >
                  <Button 
                    type='button' 
                    text={"Back"} 
                    theme={"green semi-rounded"}
                    vPadding={0.3}
                    hPadding={0}
                    width={"4rem"}
                    onClick={() => setProceed(false)}
                  />

                  <Card card_width={"32rem"}>
                    <div
                      className='AccountSetupPage_org-details-container'
                      // style={{ border: "1px solid #6aff00ff "}}
                    >

                      <p
                        style={{
                          fontFamily: "Cherry Bomb One",
                          fontSize: "2.2rem",
                          lineHeight:  "2rem",
                          textAlign: "center",
                          // border: "1px solid #00a2ffff"
                        }}>What is your organization called?</p>
                    
                      <FormInput type={"text"} placeholder={"Organization name"} name={"orgName"} onChange={handleChange} value={orgProfileData.orgName} inputRef={orgNameInput}/>

                      <Button
                        type='button'
                        text={"Finish"}
                        theme={ enableOrgButton ? "pink semi-rounded" : "pink-disabled semi-rounded" }
                        vPadding={0.7}
                        hPadding={0}
                        width={"10rem"}
                        onClick={createUserOrgProfile}
                      />
                    </div>
                  </Card>
                </div>
            )
          )
            : (//  👈 ELSE 
            <div
              className='AccountSetupPage_content AccountSetupPage_user-type-content'
              // style={{ border: "1px solid yellow "}}
            >
              <Card card_width={"35rem"}>
                <div
                  className='AccountSetupPage_type-selection-container'
                  // style={{ border: "1px solid greenyellow "}}
                >

                  <p
                    style={{
                      fontFamily: "Cherry Bomb One",
                      fontSize: "2.2rem",
                      lineHeight:  "2rem",
                      textAlign: "center"
                    }}>Are you an organization or a regular user?</p>
                
                  <div 
                    className='AccountSetupPage_user_type_buttons'
                    // style={{ border: "1px solid skyblue" }}  
                  >
                    <Button 
                      type='button' 
                      text={"I'm an individual user"} 
                      theme={selectedUserType == 'individual' ? "pink semi-rounded" : "grey semi-rounded"}  
                      vPadding={0.7}
                      hPadding={0}
                      width={"100%"}
                      onClick={() => selectAUserType('individual')}
                    />
                    <Button 
                      type='button' 
                      text={"I'm an organization"} 
                      theme={selectedUserType == 'organization' ? "pink semi-rounded" : "grey semi-rounded"}  
                      vPadding={0.7}
                      hPadding={0}
                      width={"100%"}
                      onClick={() => selectAUserType('organization')}
                    />
                  </div>

                  <Button
                    type='button'
                    text={"Continue"}
                    theme={"pink semi-rounded in-bold"}
                    vPadding={0.7}
                    hPadding={0}
                    width={"10rem"}
                    onClick={() => {
                      setProceed(true)
                      
                      if (selectedUserType === 'individual') setOrgProfileData({ nickname: "" })
                      else if (selectedUserType === 'organization') setIndividualProfileData({ firstName: "", lastName: "", nickname: ""})
                    }}
                  />


                </div>
              </Card>
            </div>
            )
          }
          
        </div>
        
        <div className={`AccountSetupPage_fade-overlay ${isTransitioning ? "fade-out" : ""}`}/>
    </div>
  );
}