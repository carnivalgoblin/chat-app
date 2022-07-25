import React from "react";
import { StyleSheet } from "react-native";
// importing screens we want to navigate between
import Start from "./components/Start";
import Chat from "./components/Chat";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start"
      >
        <Stack.Screen name="Start" component={Start} />

        <Stack.Screen name="Chat" component={Chat} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

