import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const ButtonComp = ({onPress,text,bgStyle}) => {
  return (
    <View style={[styles.container,bgStyle]}>
      <Pressable
          style={styles.btnContainer}
          onPress={onPress}
        >
          <Text style={styles.btnText}>{text}</Text>
        </Pressable>
    </View>
  )
}

export default ButtonComp

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
        color: 'white'
      },
})