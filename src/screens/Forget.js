import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../components/HeaderComp'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import TextInputComp from '../components/TextInputComp'
import ButtonComp from '../components/ButtonComp'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../config'

const Forget = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const sendMail = async() => {
      try {
        const forgetUser = await sendPasswordResetEmail(auth, email);
        Alert.alert("Password reset email sent! Please check your inbox.")
        
      } catch (error) {
        console.log(error);
        Alert.alert(error.message);
      }

    }

  return (
    <View style={styles.container}>
        <HeaderComp onPress={()=> navigation.goBack()}/>
        <Text style={styles.title}>Forget Password</Text>
        <View style={styles.body_container}>
        <TextInputComp placeholder='E-mail' onChangeText={setEmail} value={email}/>
        <ButtonComp text={'Send'} onPress={sendMail} />
        </View>
    </View>
  )
}

export default Forget

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: responsiveWidth(2),
      },
      body_container: {
        flex: 0.4,
        marginTop: responsiveHeight(10),
        alignItems: 'center',
      },
      title: {
        textAlign: 'center'
      }
})