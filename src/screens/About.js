import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import HeaderComp from '../components/HeaderComp';

const About = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
       <HeaderComp onPress={() => navigation.goBack()} />
      <Text>About</Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
})