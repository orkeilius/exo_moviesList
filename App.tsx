import { SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import UserScreen from "./screens/UserScreen";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SessionContextProvider} from "./context/SessionContextProvider";


export default function App() {

  return (
    <NavigationContainer>

        <SessionContextProvider>
          <SafeAreaView style={{ flex: 1, paddingTop: 30 }} >
            <PaperProvider>
              <BottomNav />
            </PaperProvider>
          </SafeAreaView>
        </SessionContextProvider>
    </NavigationContainer>


  );
}

function BottomNav() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={"Home"} >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Search" component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
              <Icon name="magnify" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="UserPage" component={UserScreen} options={{
        tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
        ),
      }} />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  Icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})