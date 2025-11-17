import React, { createContext, useState, useEffect, useRef } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const prevUserRef = useRef();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setDbUser(userDoc.data());
                } else {
                    setDbUser(null);
                }
            } else {
                setDbUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!loading) {
            if (prevUserRef.current && !currentUser) {
                alert('로그아웃 되었습니다.');
            }
            prevUserRef.current = currentUser;
        }
    }, [currentUser, loading]);

    return (
        <AuthContext.Provider value={{ currentUser, dbUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};