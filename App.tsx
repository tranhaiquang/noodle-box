import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation/types";
import InfoScreen from "./screens/InfoScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import OutOfNoodleScreen from "./screens/OutOfNoodleScreen";
import ErrorScreen from "./screens/ErrorScreen";
import { db, getNoodleCount } from './config/firebase';
import { doc, getDoc } from 'firebase/firestore'
const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [loading, setLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | undefined>();
  const [noodleCounts, setNoodleCounts] = useState({
    heartNoodle: 0,
    smileNoodle: 0,
    winkNoodle: 0,

  });




  useEffect(() => {
    const fetchData = async () => {
      const noodleData = await getNoodleCount();  
      if (noodleData) {
        setNoodleCounts(noodleData);  
      }
      const totalNoodle = noodleData ? noodleData.heartNoodle + noodleData.smileNoodle + noodleData.winkNoodle : 0;
      setInitialRouteName(totalNoodle > 0 ? "Welcome" : "OutOfNoodle");
      setLoading(false);  
    };

    fetchData(); 
  }, [initialRouteName]);  


  return (
    <NavigationContainer>
      {!loading && (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Confirm" component={ConfirmationScreen} />
          <Stack.Screen name="OutOfNoodle" component={OutOfNoodleScreen} />
          <Stack.Screen name="Error" component={ErrorScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default App;


