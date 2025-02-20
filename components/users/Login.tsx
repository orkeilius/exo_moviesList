import {useContext, useEffect, useState} from "react";
import {SessionContext, SessionContextType} from "../../context/SessionContextProvider";
import {createSession, openLoginPage} from "../../utils/AuthRequest";
import {View} from "react-native";
import {Button} from "react-native-paper";

export default function Login() {
    const session:SessionContextType = useContext(SessionContext);
    const [requestToken, setRequestToken] = useState<string>('');

    useEffect(() => {
        let timeout = setTimeout(() => {
            checkLogin()
        }, 1000 * 5)
        return () => {
            clearTimeout(timeout)
        }
    }, [requestToken]);

    const checkLogin = () => {
        createSession(requestToken).then(e => {
            console.log("session:",e)
            session.setSessionId(e)
        })
    }

    return (
        <View>
            <Button onPress={() => openLoginPage().then(e => setRequestToken(e))}>login</Button>
            {requestToken != "" &&
                <Button onPress={() => checkLogin()}>CheckConnection</Button>
            }
        </View>
    )
}