import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../components/HeaderComp'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import TextInputComp from '../components/TextInputComp'
import ButtonComp from '../components/ButtonComp'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../config'
import CustomText from '../components/CustomText'

const Forget = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [isMailSend, setIsMailSend] = useState(false);

    const sendMail = async() => {
      setIsMailSend(true)
      try {
        const forgetUser = await sendPasswordResetEmail(auth, email);
        setIsMailSend(false)
        Alert.alert("Password reset email sent! Please check your inbox.")
        
      } catch (error) {
        console.log(error);
        setIsMailSend(false)
        Alert.alert(error.message);
      }

    }

  return (
    <View style={styles.container}>
        <HeaderComp onPress={()=> navigation.goBack()}/>
        <CustomText style={styles.title}>Forget Password</CustomText>
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
        textAlign: 'center',
        fontSize: responsiveFontSize(3.3),
      }
})