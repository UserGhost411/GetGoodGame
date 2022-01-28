import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import About from "./screens/About";
import GiveAways from "./screens/GiveAways";
import FreeGames from "./screens/FreeGames";
import DetailGiveAway from "./screens/DetailGiveAway";
import DetailFreeGame from "./screens/DetailFreeGame";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#ccc",
        tabBarActiveBackgroundColor: '#23272A',
        tabBarInactiveBackgroundColor: '#2c2f33',
        tabBarStyle: { height: 65 },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="GiveAways"
        component={GiveAways}
        options={{
          tabBarLabel: "GiveAways",
          tabBarIcon: ({ color, size }) => {
            return (<Ionicons name="rocket-outline" size={size} color={color} />);
          },
        }}
      />

      <Tab.Screen
        name="FreeGames"
        component={FreeGames}
        options={{
          tabBarLabel: "FreeGames",
          tabBarIcon: ({ color, size }) => {
            return (<Ionicons name="albums-outline" size={size} color={color} />);
          },
        }}
      />

      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => {
            return ( <Ionicons name="information-circle-outline" size={size} color={color}/> );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const headerStyle = {
    headerTitleStyle: { color: "white" },
    headerStyle: { backgroundColor: "#23272a", },
    headerTintColor: "white",
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#2c2f33" />
        <Stack.Navigator screenOptions={{ headerShown: "true" }}>
          <Stack.Screen name="GetGoodGame" component={BottomNavigator} options={{ headerShown: true, ...headerStyle }} />
          <Stack.Screen name="DetailGiveAway" component={DetailGiveAway} options={{ title: "Details", ...headerStyle, }} />
          <Stack.Screen name="DetailFreeGame" component={DetailFreeGame} options={{ title: "Detail Game", ...headerStyle, }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
