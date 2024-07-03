import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  StatusBar,
  SafeAreaView,
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
import CustomText from "../components/CustomText";

// Keep the splash screen visible while we fetch resources

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogined, setIsLogined] = useState(false);

  const SignInPress = async () => {
    if (email.includes("@") && password.length > 5) {
      setIsLogined(true);
      try {
        const userLogin = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setIsLogined(false);
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
        setIsLogined(false);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert("Kindly check your credentials!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />

      <View style={styles.body_container}>
        <View style={styles.headingContainer}>
          <CustomText style={styles.title}>Welcome Back</CustomText>
          <CustomText style={styles.subTitle}>
            Please login to your account.
          </CustomText>
        </View>
        <CustomText style={styles.txtStyle}>Email</CustomText>
        <TextInputComp
          placeholder={"Email"}
          onChangeText={setEmail}
          value={email}
        />
        <CustomText style={styles.txtStyle}>Password</CustomText>
        <TextInputComp
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        
          <ButtonComp
            isLoading={isLogined}
            text={"Login"}
            onPress={SignInPress}
            bgStyle={styles.btnStyle}
          />
        
        <Pressable onPress={() => navigation.navigate("Forget")}>
          <CustomText style={styles.forget_lbl}>Forget Password?</CustomText>
        </Pressable>

        <View style={styles.no_acccount_container}>
          <CustomText style={styles.no_account_lbl}>
            Don't have an account?
          </CustomText>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <CustomText style={styles.sign_up_lbl}>
              {"Register Now!"}
            </CustomText>
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
    backgroundColor: "#fff",
  },
  body_container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: responsiveHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(3.3),
    letterSpacing: 0.32,
    color: "#030303",
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
  no_account_lbl: {
    marginRight: responsiveWidth(0.5),
  },
  subTitle: {
    fontSize: responsiveFontSize(1.9),
    letterSpacing: 0.2,
    color: "#030303",
  },
  headingContainer: {
    paddingBottom: responsiveHeight(5),
  },
  txtStyle: {
    color: "#030303",
    textAlign: "left",
    marginLeft: responsiveWidth(2),
  },
  btnStyle: {
    alignSelf:'center'
  }
});
