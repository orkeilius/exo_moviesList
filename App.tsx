import { SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SerieScreen from './screens/SerieScreen';
import SearchScreen from "./screens/SearchScreen";
import UserScreen from "./screens/UserScreen";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SessionContextProvider} from "./context/SessionContextProvider";
import {createStackNavigator} from "@react-navigation/stack";
import MovieScreen from "./screens/MovieScreen";
import {FavoriteScreen, WatchlistScreen} from "./screens/ListScreen";


export default function App() {

  return (
    <NavigationContainer>
        <SessionContextProvider>
          <SafeAreaView style={{ flex: 1, paddingTop: 40 }} >
            <PaperProvider>
              <RootStack />
            </PaperProvider>
          </SafeAreaView>
        </SessionContextProvider>
    </NavigationContainer>


  );
}
const Stack = createStackNavigator();
function RootStack() {

    return (
        <Stack.Navigator initialRouteName="Nav" id={null}>
            <Stack.Screen name="Nav" options={{title:"",headerShown:false}}  component={BottomNav} />
            <Stack.Screen name="MovieScreen" options={{title:"Details"}} >
                {(props: any) => <MovieScreen {...props}  />}
            </Stack.Screen>
            <Stack.Screen name="SerieScreen" options={{title:"Details"}} >
                {(props: any) => <SerieScreen {...props}  />}
            </Stack.Screen>
            <Stack.Screen name="Favoris" component={FavoriteScreen} />
        </Stack.Navigator>
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
        <Tab.Screen name="Watchlist" component={WatchlistScreen}
            options={{
            tabBarIcon: ({ color }) => (
                <Icon name="movie-open" color={color} size={26} />
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