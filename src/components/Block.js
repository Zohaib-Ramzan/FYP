import { Pressable, StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomText';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Ionicons } from "@expo/vector-icons";

const Block = ({ dateComponent, type, confidence, onLongPress, showDeleteIcon, onDelete, imageUrl }) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);

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
      <TouchableOpacity style={styles.imgContainer} onPress={() => setImageModalVisible(true)}>
        <Image source={{ uri: imageUrl }} style={styles.imgStyle} />
      </TouchableOpacity>
      {showDeleteIcon && (
        <TouchableOpacity onPress={onDelete} style={styles.iconContainer}>
          <Ionicons name='trash' size={24} color={'red'} />
        </TouchableOpacity>
      )}
      <Modal visible={imageModalVisible} transparent={true} animationType='fade'>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setImageModalVisible(false)}>
            <Ionicons name='close' size={30} color={'white'} />
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.fullScreenImage} />
        </View>
      </Modal>
    </Pressable>
  );
}

export default Block;

const styles = StyleSheet.create({
  blockContainer: {
    height: responsiveHeight(15),
    width: responsiveWidth(85),
    borderRadius: responsiveWidth(3),
    borderWidth: responsiveWidth(0.5),
    borderColor: '#f2f2f2',
    opacity: 0.9,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    justifyContent: 'space-evenly',
    borderWidth: responsiveWidth(0.2),
    borderColor: '#6200EE'
  },
  title: {
    fontSize: responsiveFontSize(2.7),
    fontWeight: '500'
  },
  dateContainer: {},
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
  imgContainer: {
    position: 'absolute',
    alignSelf: 'baseline',
    marginLeft: responsiveWidth(70),
    marginTop: responsiveHeight(4)
  },
  imgStyle: {
    width: responsiveWidth(12),
    height: responsiveHeight(10),
    resizeMode: 'contain',
    borderRadius: responsiveHeight(1.5),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(80),
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  }
});
