import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { NEXT_URL } from '@/lib/index';

const NEXT_URL = 'http://localhost:3000'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userTokens, setUserTokens] = useState('');
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn()
      }, []);

    // Login user
    // =====================================
    const login = async ({ email, password }) => {
        setIsLoading(true);
        console.log("inde i login");
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            console.log('OK');
            setUserTokens(data);
            router.push('/');
        } else {
            console.log('NOT OK');
            setIsLoading(false);
            setIsError(data.message);
            setIsError(null);
        }
    };

    // Check if user is logged in
    // ================================================
    const checkUserLoggedIn = async () => {
        setInitialLoading(true);

        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();

        if (res.ok) {
            console.log(data);
            setUserTokens(data);
        } else {
            setUserTokens(null);
        }
    };

    // Logout user
    // =====================================

    const logout = async () => {

        const res = await fetch(`${NEXT_URL}/api/logout`);
        const data = await res.json();

        if (res.ok) {
            console.log(data);
            setUserTokens(null);
            router.push('/login');
        } else {
            console.error('error logging out user');
        }

        // fetch(`${NEXT_URL}/api/logout`, {
        //     method: 'POST',
        //   })
        //     .then((res) => {
        //       setUser(null);
        //     })
        //     .catch((error) => {
        //       console.error('error logging out user');
        //     });
    };

    return (
        <AuthContext.Provider value={{ userTokens, isError, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;