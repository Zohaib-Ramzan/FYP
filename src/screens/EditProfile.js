import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComp from '../components/HeaderComp'
import { useNavigation } from '@react-navigation/native'

const EditProfile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}> 
      <HeaderComp onPress={() => navigation.goBack()} />
      <Text>EditProfile</Text>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#FFF'
    }
})