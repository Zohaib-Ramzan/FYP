import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import CustomText from './CustomText'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const ArticleLayout = memo(({title, description, image, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <TouchableOpacity  onPress={onPress} style={styles.imgContainer} >
          <Image source={{uri: image}} style={styles.imgStyle}  />
        </TouchableOpacity>
        <View style={styles.articleContentContainer}>
          <CustomText style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{title}</CustomText>
          <CustomText style={styles.description} numberOfLines={3} ellipsizeMode={'tail'}>{description}</CustomText>
        </View>
    </Pressable>
  )
})

export default ArticleLayout

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(20),
        width:responsiveWidth(85),
        borderRadius:responsiveWidth(3),
        borderWidth: responsiveWidth(0.5),
        borderColor:'#6200EE',  // previous color #f2f2f2
        opacity: 0.9,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(2),
        justifyContent:'space-evenly',
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        color: '#030303',
        fontWeight: '700',
        paddingBottom: responsiveHeight(2)
    },
    description: {
      fontSize: responsiveFontSize(2), // Example size, adjust as needed
      color: '#666', // Example color, adjust as needed
    },
    imgStyle: {
        width: responsiveWidth(20), 
        height: responsiveHeight(10),
        borderRadius: responsiveWidth(2)
      },
      imgContainer: {
        justifyContent: 'center'
      },
      articleContentContainer: {
        height: responsiveHeight(10),
        // flex: 1,
        width: responsiveWidth(50)
      }

})