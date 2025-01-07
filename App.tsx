import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation/types";
import InfoScreen from "./screens/InfoScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import OutOfNoodleScreen from "./screens/OutOfNoodleScreen";
import ErrorScreen from "./screens/ErrorScreen";
import CameraScreen from "./screens/CameraScreen";
import { Provider } from "react-redux"; // Import Provider
import store from "./redux/store"; // Import your store
const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();
const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Confirm" component={ConfirmationScreen} />
          <Stack.Screen name="OutOfNoodle" component={OutOfNoodleScreen} />
          <Stack.Screen name="Error" component={ErrorScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;


