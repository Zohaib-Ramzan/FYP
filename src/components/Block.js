import { Pressable, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Ionicons } from "@expo/vector-icons";

const Block = ({dateComponent,type,confidence,onLongPress,showDeleteIcon,onDelete}) => {
  return (
    <Pressable style={[styles.blockContainer, showDeleteIcon && styles.overlay]} onLongPress={onLongPress}>
      <View style={styles.dateContainer}>
        {dateComponent}
      </View>
      <CustomText>
        {`Type: ${type}`}
      </CustomText>
      <CustomText>
        {`Confidence: ${confidence}%`}
      </CustomText>
      {showDeleteIcon && (
        <TouchableOpacity onPress={onDelete} style={styles.iconContainer}>
          <Ionicons name='trash' size={24} color={'red'}/>
        </TouchableOpacity>
      ) }
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
    },
    dateContainer:{

    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    iconContainer: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'transparent',
    },

})