import React from "react";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Forget from "../screens/Forget";
import { useFonts,Roboto_900Black, Roboto_400Regular } from "@expo-google-fonts/roboto";
import Block from "../components/Block";
import Predictions from "../screens/Predictions";
import Splash from "../screens/Splash";
import Settings from "../screens/Settings";
import EditProfile from "../screens/EditProfile";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import About from "../screens/About";
import MainScreen from "../screens/MainScreen";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const MainRouter = () => {

  let [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_400Regular
  });

  // Check Fonts
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Prediction" component={Predictions}/>
        <Stack.Screen name="Block" component={Block}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
