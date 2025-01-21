import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import HeaderComp from '../components/HeaderComp';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const About = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
       <HeaderComp onPress={() => navigation.goBack()} />
     <ScrollView contentContainerStyle={styles.container_scrollView}>
      <View>
        <Image source={require('../../assets/BTPLogo_zoom.png')} style={styles.logoStyle} />
      </View>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.text}>
        This application is developed as a final year project for brain tumor classification and detection using advanced techniques. 
      </Text>

      <Text style={styles.text}>
        The app utilizes a Convolutional Neural Network (CNN) model to classify brain tumors into four categories:
      </Text>

      <Text style={styles.listItem}>1. Meningioma</Text>
      <Text style={styles.listItem}>2. Glioma</Text>
      <Text style={styles.listItem}>3. Pituitary Gland Tumor</Text>
      <Text style={styles.listItem}>4. No Tumor</Text>

      <Text style={styles.text}>
        This project aims to assist in the early detection and classification of brain tumors to enhance diagnostic capabilities.
      </Text>

      <Text style={styles.text}>
        Developed by:
      </Text>
      <Text style={styles.developerName}>Student 1: Zohaib Ramzan</Text>
      <Text style={styles.developerName}>Student 2: Muhammad Ismail Saeed</Text>

      <Text style={styles.text}>
        We hope you find this app useful!
      </Text>
    </ScrollView>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container_scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#6200EE'
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    lineHeight: 24,
  },
  developerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logoStyle: {
    height:responsiveHeight(20),
    width:responsiveWidth(40),
    resizeMode:'contain',
    alignSelf: 'center',
    marginBottom: responsiveHeight(5)
  }
})