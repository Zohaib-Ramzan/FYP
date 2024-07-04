import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Block from "../../Components/Block";
import ButtonComp from "../components/ButtonComp";
import { useNavigation } from "@react-navigation/native";
import HeaderComp from "../components/HeaderComp";

const History = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
        <HeaderComp onPress={()=>navigation.goBack()} />
      <View style={styles.body_container}>
        <Block />
        <ButtonComp text={'New Prediction'} onPress={()=>navigation.navigate("Prediction")} bgStyle={{alignSelf:'center'}} btnStyle={styles.btnStyle} />
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  body_container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: responsiveHeight(5),
  },
  btnStyle:{
    width:responsiveWidth(60)
  }
  
});
