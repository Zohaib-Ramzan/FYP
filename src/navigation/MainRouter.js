import React from "react";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Forget from "../screens/Forget";
import { useFonts,Roboto_900Black, Roboto_400Regular } from "@expo-google-fonts/roboto";


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
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
