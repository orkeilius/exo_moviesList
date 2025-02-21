import {createContext, useEffect, useMemo, useState} from "react";
import { getUserDetails } from "../utils/AuthRequest";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SessionContext = createContext(null);

export function SessionContextProvider({children}: Readonly<{ children: React.ReactNode }>) {
    const [sessionId, setSessionId] = useState<string>('');
    const [username, setUsername] = useState<string>('');


    const loadSessionId = async () => {
        const value = await AsyncStorage.getItem('sessionId');
        if (value !== null) {
            setSessionId(value)
        }
    }
    const saveSessionId = async () => {
        await AsyncStorage.setItem('sessionId', sessionId);
    }

    useEffect(() => {
        loadSessionId()
    }, []);

    useEffect(() => {
        console.log("getting user details", sessionId)
        saveSessionId()
        getUserDetails().then(e => {
            setUsername(e.username)
        })
    }, [sessionId]);

    const values: SessionContextType = useMemo(() => ({sessionId, username, setSessionId }),[sessionId, username, setSessionId]);
    return (
        <SessionContext.Provider value={values}>
            {children}
        </SessionContext.Provider>
    )
}

export type SessionContextType = {
    sessionId: string,
    username: string,
    setSessionId: (sessionId: string) => void
}