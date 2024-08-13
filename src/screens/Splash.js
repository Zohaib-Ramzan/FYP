import React, { useEffect, useContext, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config";

const Splash = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // Directly listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, navigate to Home screen
        navigation.navigate("Home");
      } else {
        // No user is logged in, navigate to Login screen
        navigation.navigate("Login");
      }
      setLoading(false); // Set loading to false after navigation decision
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If loading is false, the useEffect hook will have already navigated away
  return null;
};

export default Splash;
