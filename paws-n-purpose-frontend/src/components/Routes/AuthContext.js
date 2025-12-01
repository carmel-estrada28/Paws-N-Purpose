import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [hasProfileSet, setHasProfileSet] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/users/me", {
            credentials: "include"
            });
            const data = await res.json();

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

    return (
        <AuthContext.Provider value={{ user, hasProfileSet, loading, setUser, setHasProfileSet }}>
        {children}
        </AuthContext.Provider>
    );
}
