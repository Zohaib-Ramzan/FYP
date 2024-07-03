import { StyleSheet, Text, View , TextInput} from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const TextInputComp = ({onChangeText, placeholder, value, secureTextEntry,keyboardType,placeholderTextColor}) => {
  return (
    <View style={styles.container}>
       <TextInput style={styles.textInput} onChangeText={onChangeText} 
       placeholder={placeholder} 
       value={value}
       secureTextEntry={secureTextEntry}
       keyboardType={keyboardType}
       placeholderTextColor={placeholderTextColor}
       />
    </View>
  )
}

export default TextInputComp

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: responsiveHeight(1)
    },
    textInput: {
        width: responsiveWidth(80),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        backgroundColor: '#f2f2f2',
        borderRadius: responsiveWidth(5)
      },
})