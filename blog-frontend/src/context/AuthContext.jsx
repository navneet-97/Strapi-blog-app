import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    useEffect(() => {

        if (token) {
            fetchMe();
        }

    }, [token]);

    async function fetchMe() {

        const res = await fetch(
            "http://localhost:1337/api/users/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        setUser(data);
    }

    async function login(identifier, password) {

        const res = await fetch(
            "http://localhost:1337/api/auth/local",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier,
                    password,
                }),
            }
        );

        const data = await res.json();

        localStorage.setItem("token", data.jwt);

        setToken(data.jwt);
    }

    async function register(
        username,
        email,
        password
    ) {

        const res = await fetch(
            "http://localhost:1337/api/auth/local/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            }
        );

        const data = await res.json();

        localStorage.setItem("token", data.jwt);

        setToken(data.jwt);
    }

    function logout() {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}