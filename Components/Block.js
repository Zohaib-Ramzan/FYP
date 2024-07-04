import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../src/components/CustomText'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Block = () => {
  return (
    <Pressable style={styles.blockContainer}>
      <CustomText style={styles.title}>
        {'Prediction on 12th Sep 2023'}
      </CustomText>
      <CustomText>
        {'Type: Meningioma'}
      </CustomText>
      <CustomText>
        {'Confidence: 89%'}
      </CustomText>
    </Pressable>
  )
}

export default Block

const styles = StyleSheet.create({
    blockContainer: {
        height: responsiveHeight(15),
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
        fontSize:responsiveFontSize(2.7),
        fontWeight:'500'
    }

})