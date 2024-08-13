import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ButtonComp from '../components/ButtonComp'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CustomText from '../components/CustomText'
import { AppContext, useAppContext } from '../hooks/Context'
import { auth } from '../../config'
import { useNavigation } from '@react-navigation/native'
import SeparatorLine from '../components/SeparatorLine'

const Settings = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {resetUsers} = useContext(AppContext);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await auth.signOut();
      // Reset the navigation stack to start fresh with the Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      resetUsers(); // reset user context
      setIsLoading(false);
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonListContainer} onPress={() =>navigation.navigate('Edit Profile')}>
        <CustomText style={styles.textListContainer}>{'Edit Profile'}</CustomText>
      </TouchableOpacity>

      {/* Separator Line */}
      <SeparatorLine />

      <TouchableOpacity style={styles.buttonListContainer} onPress={() =>navigation.navigate('Privacy Policy')}>
        <CustomText style={styles.textListContainer}>{'Privacy Policy'}</CustomText>
      </TouchableOpacity>

      {/* Separator Line */}
      <SeparatorLine />

      <TouchableOpacity style={styles.buttonListContainer} onPress={() =>navigation.navigate('About')}>
        <CustomText style={styles.textListContainer}>{'About'}</CustomText>
      </TouchableOpacity>

      <SeparatorLine />
      <ButtonComp text={'LogOut'} bgStyle={{ alignSelf: "center" }} isLoading={isLoading} btnStyle={styles.btnStyle} onPress={handleLogout} />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: responsiveWidth(100),
    paddingVertical: responsiveHeight(2),
    justifyContent:'center'
  },
  btnStyle: {
    width: responsiveWidth(60),
    marginTop: responsiveHeight(2),
  },
  buttonListContainer: {
    height: responsiveHeight(7),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textListContainer: {
    fontSize: responsiveFontSize(3),
  },
 
});