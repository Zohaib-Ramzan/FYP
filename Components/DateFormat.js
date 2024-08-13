import React from "react";
import CustomText from "../src/components/CustomText";
import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
const DateFormat = ({ timestamp }) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Determine the appropriate suffix for the day
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
    
      return <CustomText style={styles.title}>{`Prediction on ${day}${suffix} ${month} ${year}`}</CustomText>;
};

const styles = StyleSheet.create({
    title: {
        fontSize:responsiveFontSize(2.7),
        fontWeight:'500'
    },
})

export default DateFormat;
