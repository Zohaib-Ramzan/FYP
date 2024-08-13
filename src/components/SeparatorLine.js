import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SeparatorLine = () => {
  return (
    <View style={styles.separator} />
  )
}

export default SeparatorLine

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: '90%',
        backgroundColor: '#ccc',
        alignSelf: 'center',
      }
})