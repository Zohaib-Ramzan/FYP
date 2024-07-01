import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainRouter from './src/navigation/MainRouter'

const App = () => {
  return (
    <View style={styles.container}>
      <MainRouter />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})