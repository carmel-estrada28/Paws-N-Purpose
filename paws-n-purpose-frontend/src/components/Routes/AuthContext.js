import { createContext, useState, useEffect, use } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [hasProfileSet, setHasProfileSet] = useState(false);
    const [loading, setLoading] = useState(true);

    // useEffects
    useEffect(() => {
        const fetchMe = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/users/me", {
            credentials: "include"
            });

            const data = await res.json();

            
            console.log("%cAPI /api/users/me fetched done", "color: green; font-size: 1rem; font-weight: bold;");
            console.log("API response:", data);

            if (data.authenticated) {
                setUser(data.user);
                setHasProfileSet(data.user.hasProfileSet);
            } else {
                setUser(null);
                setHasProfileSet(false);
            }
        } finally {
            setLoading(false);
        }
        };

        fetchMe();
    }, []);


    // functions
    

    return (
        <AuthContext.Provider value={{ user, hasProfileSet, loading, setUser, setHasProfileSet }}>
        {children}
        </AuthContext.Provider>
    );
}
