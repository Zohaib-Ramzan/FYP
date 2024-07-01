import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import TextInputComp from "../components/TextInputComp";
import ButtonComp from "../components/ButtonComp";

import { auth } from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignInPress = async () => {
    if (email.includes("@") && password.length > 5) {
      try {
        const userLogin = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert("Kindly check your credentials!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
      <Text style={styles.title}>Login to Account</Text>
      <View style={styles.body_container}>
        <TextInputComp
          placeholder={"Email"}
          onChangeText={setEmail}
          value={email}
        />
        <TextInputComp
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <ButtonComp text={"Login"} onPress={SignInPress} />
        <Pressable onPress={() => navigation.navigate("Forget")}>
          <Text style={styles.forget_lbl}>Forget Password?</Text>
        </Pressable>

        <View style={styles.no_acccount_container}>
          <Text style={styles.no_account_lbl}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.sign_up_lbl}>{"Register Now!"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  body_container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveHeight(5),
    alignItems: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: responsiveFontSize(2),
  },
  forget_lbl: {
    textAlign: "center",
    color: "#6200EE",
  },
  no_acccount_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(2),
    alignItems: "center",
  },
  sign_up_lbl: {
    marginLeft: responsiveWidth(0.5),
    color: "#6200EE",
  },
});
