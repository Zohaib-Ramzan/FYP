import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainRouter from './src/navigation/MainRouter'

import { AppProvider } from './src/hooks/Context'

const App = () => {
  return (
    <View style={styles.container}>
      <AppProvider>
         <MainRouter />
      </AppProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})