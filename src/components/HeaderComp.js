import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const HeaderComp = ({onPress}) => {
    const navigation = useNavigation();
  return (
    <Pressable style={styles.container}onPress={onPress}>
      <Ionicons name='arrow-back' color={'black'} size={26} />
    </Pressable>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
  container: {
    margin: responsiveWidth(5),
    backgroundColor:'#FFF'
  }
})