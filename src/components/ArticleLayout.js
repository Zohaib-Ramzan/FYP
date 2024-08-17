import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const ArticleLayout = ({title, description, image}) => {
  return (
    <Pressable style={styles.container}>
        <TouchableOpacity style={styles.imgContainer} >
          <Image source={{uri: image}} style={styles.imgStyle}  />
        </TouchableOpacity>
        <Pressable>
        <CustomText style={styles.title}>{title}</CustomText>
        <CustomText>{description}</CustomText>
        </Pressable>
    </Pressable>
  )
}

export default ArticleLayout

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(20),
        width:responsiveWidth(85),
        borderRadius:responsiveWidth(3),
        borderWidth: responsiveWidth(0.5),
        borderColor:'#f2f2f2',
        opacity: 0.9,              // Block opacity
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(2),
        justifyContent:'space-evenly',
    },
    title: {
        fontSize: 18,
        color: '#030303',
        fontWeight: '700'
    },
    imgStyle: {
        width: responsiveWidth(20), 
        height: responsiveHeight(10),
        borderRadius: responsiveWidth(2)
      },
      imgContainer: {

      }

})