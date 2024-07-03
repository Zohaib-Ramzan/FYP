import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { responsiveHeight } from "react-native-responsive-dimensions";
import CustomText from "./CustomText";

const ButtonComp = ({ onPress, text, bgStyle, isLoading }) => {
  return (
    <View style={[styles.container, bgStyle]}>
      <Pressable style={styles.btnContainer} onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"#FFF"} />
        ) : (
          <CustomText style={styles.btnText}>{text}</CustomText>
        )}
      </Pressable>
    </View>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: responsiveHeight(1),
  },
  btnContainer: {
    width: 90,
    height: 40,
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
  },
});
