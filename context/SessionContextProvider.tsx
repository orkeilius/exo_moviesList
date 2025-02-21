import { createContext, useEffect, useState } from "react";
import { getUserDetails } from "../utils/AuthRequest";

export const SessionContext = createContext(null);

export function SessionContextProvider(props: any) {
    var [sessionId, setSessionId] = useState<string>('');
    var [username, setUsername] = useState<string>('');
    var [userId, setUserId] = useState<number>(0);

    useEffect(() => {
        console.log("getting user details", sessionId)
        getUserDetails().then(e => {
            setUsername(e.username)
            setUserId(e.id)
        })
    }, [sessionId]);

    let values: SessionContextType = { sessionId, username, setSessionId }
    return (
        <SessionContext.Provider value={values}>
            {props.children}
        </SessionContext.Provider>
    )
}

export type SessionContextType = {
    sessionId: string,
    username: string,
    setSessionId: (sessionId: string) => void
}