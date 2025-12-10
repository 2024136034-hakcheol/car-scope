import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setDbUser(userDoc.data());
                    } else {
                        setDbUser({ 
                            uid: user.uid, 
                            email: user.email, 
                            isAdmin: false, 
                            isJournalist: false 
                        });
                    }
                } catch (error) {
                    setDbUser(null);
                }
            } else {
                setDbUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ currentUser, dbUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};