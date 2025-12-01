


import { useEffect } from "react";

export default function FetchMeAndNavigate({ setUser, setHasProfileSet, setLoading }) {


  useEffect(() => {
      const fetchMe = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/users/me", {
            method: "GET",
            credentials: "include"
          })
  
          const data = await response.json();
  
          console.log("%cAPI /api/users/me fetched done", "color: green; font-size: 1rem; font-weight: bold;");
          console.log("API response:", data);
  
          if (data.authenticated) {
            setUser(data.user);
            setHasProfileSet(data.user.hasProfileSet);
          } else {
            setUser(null);
            setHasProfileSet(false);
          }

        } catch (err) {
          console.log("Error: ", err);
          
          setUser(null)
          setHasProfileSet(false)
        } finally {
          setLoading(false)
        }
      }
  
      fetchMe()
    }, []);
  return null; 
}