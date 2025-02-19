import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import UserScreen from "./screens/UserScreen";
import { NavigationContainer } from "@react-navigation/native";
import SafeAreaProviderCompat from "react-native-paper/lib/typescript/core/SafeAreaProviderCompat";
import { PaperProvider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, paddingTop: 30 }} >
        <PaperProvider>
          <BottomNav />
        </PaperProvider>
      </SafeAreaView>

    </NavigationContainer>


  );
}

function BottomNav() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={"Home"}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
      tabBarIcon: ({ color }) => (
        <View style={styles.Icon}>
          <Icon name="home" color={color} size={26} />
        </View>
      ),
      }} />
      <Tab.Screen name="Search" component={SearchScreen} 
      options={{
      tabBarIcon: ({ color }) => (
        <View style={styles.Icon}>
        <Icon name="magnify" color={color} size={26} />
        </View>
      ),
      }}/>
      <Tab.Screen name="UserPage" component={UserScreen} options={{
        tabBarIcon: ({ color }) => (
        <View style={styles.Icon}>
          <Icon name="account" color={color} size={26} />
        </View>
        ),
      }}/>
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