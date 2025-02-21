import {Button, Divider, MD3Colors, Text} from "react-native-paper";
import {SessionContext} from "../context/SessionContextProvider";
import {useContext} from "react";
import Login from "../components/users/Login";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function UserScreen() {
    const navigation = useNavigation();
    const session = useContext(SessionContext);
    console.log(session.sessionId)
    if (session.sessionId=== "") {
        return <Login/>
    } else {
        return (
            <View style={{flex: 1, alignItems: "center"}}>
                <View style={{width:"100%",height:150, alignItems: "center",backgroundColor: MD3Colors.primary30}}>

                <Text variant="headlineMedium" style={{margin:50,color:MD3Colors.primary100}} >
                    Welcome {session.username}
                </Text>

                </View>
                <View style={{width:"100%"}}>
                    <DrawerItem text="Favoris" action={()=> navigation.navigate("Favoris")}/>
                    <DrawerItem text="Watch list" action={()=> navigation.navigate("Watchlist")}/>
                    <DrawerItem text="Log out" action={()=> session.setSessionId("")}/>
                </View>
            </View>
        )
    }
}

function DrawerItem({text,action}){
    return (
        <View style={{width:"100%"}}>
            <Button style={{width:"100%"}}  onPress={action}>{text}</Button>
            <Divider bold/>
        </View>
    )
}