import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderComp from '../components/HeaderComp'
import { useNavigation } from '@react-navigation/native'
import TextInputComp  from '../components/TextInputComp'
import CustomText from "../components/CustomText";
import { auth, FIRESTORE_DB } from "../../config";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { data, log } from '@tensorflow/tfjs'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { AppContext } from '../hooks/Context';
import ButtonComp from "../components/ButtonComp";
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'

const EditProfile = () => {
  const navigation = useNavigation();
  const { users, setUsers } = useContext(AppContext);
  const [name, setName] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [initialName, setInitialName] = useState(''); 
  const [isLoading , setIsLoading] = useState(false);

  useEffect(() => {
    // Update the state with the context data if Available
    if (users.name) {
      setName(users.name);
      setInitialName(users.name);
    }
  }, [users]);

  const handleUpdateProfile = async () => {
    const currentUser = auth.currentUser;
    let isNameChanged = name !== initialName;
    let isPasswordChanged = currentPassword && newPassword;
  
    setIsLoading(true); // Start loading
  
    try {
      
      if (!isNameChanged && !isPasswordChanged) {
        Alert.alert("No changes to update.Please enter password!");
        setIsLoading(false); // Stop loading
        return;
      }
  
      // Update name if it's changed
      if (isNameChanged) {
        await updateProfile(currentUser, { displayName: name });
  
        // Optionally update Firestore
        const userRef = doc(FIRESTORE_DB, "BTPUsers", currentUser.uid);
        await updateDoc(userRef, { name });
  
        // Update context with the new name
        setUsers((prevUsers) => ({
          ...prevUsers,
          name: name,
        }));
      }
  
      // Re-authenticate and update password
      if (isPasswordChanged) {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
  
        // Re-authenticate the user
        await reauthenticateWithCredential(currentUser, credential);
  
        // Update the password
        await updatePassword(currentUser, newPassword);
      } else if (currentPassword && !newPassword) {
        Alert.alert("Please enter a new password if you're changing it.");
      }

      if (isNameChanged && !isPasswordChanged) {
        Alert.alert("Profile Name updated successfully!");
        navigation.goBack();
      } else if (isPasswordChanged && !isNameChanged) {
        Alert.alert("Password updated successfully!");
        navigation.goBack();
      } else if (isNameChanged && isPasswordChanged) {
        Alert.alert("Credentials are updated successfully!");
        navigation.goBack();
      }
  
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        Alert.alert("Invalid current password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert("Too many requests. Please try again later.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("The new password is too weak. Please choose a stronger password.");
      } else {
        console.error("Error updating profile: ", error);
        Alert.alert("Failed to update profile or password. Please try again.");
      }
    } finally {
      setIsLoading(false); // Always stop loading, even in case of error
    }
  };



  return (
    <ScrollView style={styles.container_view}> 
      <HeaderComp onPress={() => navigation.goBack()} />
        <View>
          <Image source={require('../../assets/BTPLogo_zoom.png')} style={styles.logoStyle} />
        </View>
        <View style={styles.container}>
          <CustomText style={styles.txt_style}>
            Profile Name
          </CustomText>
         <TextInputComp
          placeholder={"Your Name"}
          value={name}
          onChangeText={setName}
         />
         <CustomText style={styles.txt_style}>
            Current Password
          </CustomText>
         <TextInputComp
          placeholder={"Your Current Password"}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={true}
         />
         <CustomText style={styles.txt_style}>
            New Password
          </CustomText>
         <TextInputComp
          placeholder={"Your New Password"}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
         />
         <ButtonComp 
         text={'Update Profile'}
         btnStyle={{width: responsiveWidth(40),marginLeft:responsiveWidth(25),marginTop:responsiveHeight(3)}}
         isLoading={isLoading}
         onPress={handleUpdateProfile}
         />
        </View>
    </ScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container_view: {
      flex:1,
      backgroundColor:'#FFF',
    },
    container: {
      marginHorizontal: responsiveWidth(5),
    },
    txt_style: {
      marginLeft: responsiveWidth(3)
    },
    logoStyle: {
      height:responsiveHeight(20),
      width:responsiveWidth(40),
      resizeMode:'contain',
      alignSelf: 'center',
      marginBottom:responsiveHeight(8)
    }
})