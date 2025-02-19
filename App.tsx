import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import UserScreen from "./screens/UserScreen";
import {NavigationContainer} from "@react-navigation/native";
import SafeAreaProviderCompat from "react-native-paper/lib/typescript/core/SafeAreaProviderCompat";
import {PaperProvider} from "react-native-paper";

export default function App() {

  return (

      <NavigationContainer>
        <PaperProvider>
         <BottomNav/>
        </PaperProvider>
      </NavigationContainer>

  );
}

function BottomNav(){
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={"Home"}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="UserPage" component={UserScreen} />
    </Tab.Navigator>
  )
}