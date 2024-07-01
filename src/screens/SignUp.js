import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderComp from "../components/HeaderComp";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import TextInputComp from "../components/TextInputComp";
import ButtonComp from "../components/ButtonComp";
import { auth } from "../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SignUpPress = () => {
    if (
      password === confirmPassword &&
      email.includes("@") &&
      password.length > 5
    ) {
      createUser();
      navigation.navigate("Home");
    } else {
      Alert.alert("Kindly check your credentials!");
    }
  };

  // Creating User Profile
  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Handle successful signup
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
      <HeaderComp onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Create new account</Text>
      <View style={styles.body_container}>
        <TextInputComp
          placeholder="Your Name"
          onChangeText={setName}
          value={name}
        />
        <TextInputComp
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInputComp
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
        />
        <TextInputComp
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <ButtonComp
          text={"SignUp"}
          bgStyle={styles.login_btn}
          onPress={SignUpPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    alignSelf: "center",
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
  },
  body_container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
    alignItems: "center",
  },
  login_btn: {
    marginVertical: responsiveHeight(2),
  },
});
