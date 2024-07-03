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
import CustomText from "../components/CustomText";

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const SignUpPress = () => {
    if (
      password === confirmPassword &&
      email.includes("@") &&
      password.length > 5
    ) {
      setIsSignup(true)
      createUser();
      setIsSignup(false)
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
      <CustomText style={styles.title}>Brain Tumour Predictor</CustomText>
      <View style={styles.body_container}>
        <CustomText style={styles.txtStyle}>{'Username'}</CustomText>
        <TextInputComp
          placeholder="Enter Your Name"
          onChangeText={setName}
          value={name}
        />
        <CustomText style={styles.txtStyle}>{'Email'}</CustomText>
        <TextInputComp
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />
        <CustomText style={styles.txtStyle}>{'Password'}</CustomText>
        <TextInputComp
          placeholder="Enter Password"
          onChangeText={setPassword}
          value={password}
        />
        <CustomText style={styles.txtStyle}>{'Confirm Password'}</CustomText>
        <TextInputComp
          placeholder="Enter Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <ButtonComp
          text={"SignUp"}
          bgStyle={styles.login_btn}
          onPress={SignUpPress}
          isLoading={isSignup}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    alignSelf: "center",
    fontSize: responsiveFontSize(3.3),
    marginTop: responsiveHeight(1),
  },
  body_container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
    alignSelf:'center',
  },
  login_btn: {
    alignSelf:'center',
    marginVertical: responsiveHeight(2),
  },
  txtStyle: {
    marginLeft: responsiveWidth(2)
  }
});
