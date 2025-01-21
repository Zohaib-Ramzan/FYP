import { StyleSheet, Text, View , TextInput, Pressable} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const TextInputComp = ({onChangeText, placeholder, value, secureTextEntry, keyboardType, placeholderTextColor}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
       <TextInput style={styles.textInput} onChangeText={onChangeText} 
       placeholder={placeholder} 
       value={value}
       secureTextEntry={secureTextEntry && !showPassword}
       keyboardType={keyboardType}
       placeholderTextColor={placeholderTextColor}
       selectionColor="#6200EE"
       />
       {secureTextEntry && (
        <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#6200EE" />
        </Pressable>
      )}
    </View>
  )
}

export default TextInputComp

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: responsiveHeight(1),
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: responsiveWidth(5),   
        paddingHorizontal: responsiveWidth(3),
        
    },
    textInput: {
      // flex: 1,
      paddingVertical: responsiveHeight(1),
      width: responsiveWidth(75),
      },
      icon: {
        paddingHorizontal: responsiveWidth(1),
      },
})