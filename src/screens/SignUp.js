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
import { auth, FIRESTORE_DB } from "../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomText from "../components/CustomText";

import { useContext } from "react";
import { AppContext } from "../hooks/Context";
import { doc,setDoc } from "firebase/firestore";
import { createdAt } from "expo-updates";
import { Image } from "react-native";

const SignUp = () => {
  const {setUsers} = useContext(AppContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

 const SignUpPress = async () => {
    if (password === confirmPassword && email.includes("@") && password.length > 5) {
      setIsSignup(true);
      try {
        await createUser(); 
        navigation.navigate("Home");
      } catch (error) {
      } finally {
        setIsSignup(false); 
      }
    } else {
      // Validation failed
      Alert.alert("Error", "Kindly check your credentials! Passwords must match, and the email should be valid.");
    }
  };

  // Creating User Profile
  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save User details to Firestore
      await setDoc(doc(FIRESTORE_DB, 'BTPUsers', user.uid), {
        name: name,
        email: user.email,
        createdAt: new Date(),
      });
      setUsers({ name: name, email: email, uid: user.uid });
    } catch (error) {
      const errorCode = error.code;
      
      // Handle different error codes with alerts
      switch (errorCode) {
        case 'auth/email-already-in-use':
          Alert.alert("Error", "This email address is already in use.");
          break;
        case 'auth/invalid-email':
          Alert.alert("Error", "The email address is not valid.");
          break;
        case 'auth/network-request-failed':
          Alert.alert("Error", "Network request failed. Please check your connection.");
          break;
        default:
          Alert.alert("Error", "Something went wrong. Please try again.");
      }

      throw error;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
      <HeaderComp onPress={() => navigation.goBack()} />
      
      <View style={styles.body_container}>
      <View>
          <Image source={require('../../assets/BTPLogo_zoom.png')} style={styles.logoStyle} />
        </View>
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
          secureTextEntry={true}
          value={password}
        />
        <CustomText style={styles.txtStyle}>{'Confirm Password'}</CustomText>
        <TextInputComp
          placeholder="Enter Confirm Password"
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
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
    marginBottom: responsiveHeight(10),
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
  },
  logoStyle: {
    height:responsiveHeight(20),
    width:responsiveWidth(40),
    resizeMode:'contain',
    alignSelf: 'center',
    marginBottom: responsiveHeight(5)
  }
});
