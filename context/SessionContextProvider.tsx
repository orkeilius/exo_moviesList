import {createContext, useEffect, useMemo, useState} from "react";
import { getUserDetails } from "../utils/AuthRequest";

export const SessionContext = createContext(null);

export function SessionContextProvider({children}: Readonly<{ children: React.ReactNode }>) {
    const [sessionId, setSessionId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);

    useEffect(() => {
        console.log("getting user details", sessionId)
        getUserDetails().then(e => {
            setUsername(e.username)
            setUserId(e.id)
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