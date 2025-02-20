import {Text} from "react-native-paper";
import {SessionContext} from "../context/SessionContextProvider";
import {useContext} from "react";
import Login from "../components/users/Login";

export default function UserScreen() {
    const session = useContext(SessionContext);
    console.log(session.sessionId)
    if (session.sessionId== "") {
        return <Login/>
    } else {
        return <Text>Logged in as {session.username}</Text>
    }
}