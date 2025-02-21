import { useContext, useEffect, useState } from "react";
import { SessionContext, SessionContextType } from "../../context/SessionContextProvider";
import { createSession, openLoginPage } from "../../utils/AuthRequest";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

export default function Login() {
    const session: SessionContextType = useContext(SessionContext);
    const navigation = useNavigation<any>();
    const [requestToken, setRequestToken] = useState<string>('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            checkLogin()
        }, 5000)
        return () => {
            clearTimeout(timeout)
        }
    }, [requestToken]);

    const checkLogin = () => {
        createSession(requestToken).then(e => {
            console.log("session:", e)
            session.setSessionId(e)
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button style={{ padding: 10 }} mode="contained"
                onPress={() => openLoginPage().then(e => setRequestToken(e))}
            >
                login
            </Button>
            {requestToken !== "" &&
                <Button style={{ margin: 5 }} onPress={() => checkLogin()}>Check connection ?</Button>
            }
        </View>
    )
}