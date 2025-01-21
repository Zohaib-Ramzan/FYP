import React, { useEffect, useContext, useState } from "react";
import { View, ActivityIndicator,Image,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const Splash = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [delayFinished, setDelayFinished] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDelayFinished(true); 
    }, 3000);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    if (!delayFinished) return;

    // Directly listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, navigate to Home screen
        navigation.navigate("MainScreen");
      } else {
        // No user is logged in, navigate to Login screen
        navigation.navigate("Login");
      }
      setLoading(false); // Set loading to false after navigation decision
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [delayFinished,navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={require('../../assets/BTPLogo_zoom.png')} style={styles.logoStyle}/>
      </View>
    );
  }

  // If loading is false, the useEffect hook will have already navigated away
  return null;
};

export default Splash;

const styles = StyleSheet.create({
  logoStyle: {
    height:responsiveHeight(20),
    width:responsiveWidth(40),
    resizeMode:'contain',
    alignSelf: 'center',
    marginBottom: responsiveHeight(5)
  }
})
