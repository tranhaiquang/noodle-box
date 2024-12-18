import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation/types";
import InfoScreen from "./screens/InfoScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import OutOfNoodleScreen from "./screens/OutOfNoodleScreen";
import ErrorScreen from "./screens/ErrorScreen";
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Confirm" component={ConfirmationScreen} />
        <Stack.Screen name="OutOfNoodle" component={OutOfNoodleScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


