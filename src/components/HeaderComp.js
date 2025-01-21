import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const HeaderComp = ({onPress}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableStyle} onPress={onPress}>
        <Ionicons name='arrow-back' color={'#6200EE'} size={26} />
      </Pressable>
    </View>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
  container: {
    margin: responsiveWidth(5),
    paddingTop: responsiveHeight(6),
    backgroundColor:'#FFF'
  },
  pressableStyle: {
    width: responsiveWidth(8)
  }
})