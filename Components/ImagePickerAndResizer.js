import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

//This component is used to select an image from the device's library or camera
//and resize it to a square of a specified size.

export default function ImagePickerAndResizer({ selectedImage, setSelectedImage }) {
  const [originalImageSize, setOriginalImageSize] = useState(null);
  const [imageSize, setImageSize] = useState();
  const [resizeTimeout, setResizeTimeout] = useState(null);
  const [isLoadingImageAction, setIsLoadingImageAction] = useState(false);

  useEffect(() => {
    if (originalImageSize) {
      const minDimension = Math.min(originalImageSize.width, originalImageSize.height);
      setImageSize(Math.min(minDimension, 2400));
    }
  }, [originalImageSize]);
  
  useEffect(() => {
    if (selectedImage && imageSize) {
      const resizeImage = async () => {
        const resizedImage = await ImageManipulator.manipulateAsync(
          selectedImage.uri,
          [{ resize: { width: imageSize } }], // actions
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }, // options
        );
        setSelectedImage(resizedImage);
      };
      resizeImage();
    }
  }, [imageSize]);

  const handleSliderChange = (value) => {
    // Clear the previous timer
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    // Start a new timer
    const newTimeout = setTimeout(() => {
      setImageSize(value);
    }, 100);

    setResizeTimeout(newTimeout);
  };

  const getPermissionAsync = async () => {
    const { status: cameraRollPerm } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (cameraRollPerm !== 'granted') {
      const { status: cameraRollPerm } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraRollPerm !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false;
      }
    }

    const { status: cameraPerm } = await ImagePicker.getCameraPermissionsAsync();

    if (cameraPerm !== 'granted') {
      const { status: cameraPerm } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPerm !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return false;
      }
    }

    return true;
  };

  handleImagePickingResult = (result) => {
    if (!result.canceled) {
      const image = result.assets[0];
      if (image.uri) {
        setOriginalImageSize({ width: image.width, height: image.height });
        setSelectedImage(image);
      } else {
        console.error('No image URI returned from ImagePicker');
      }
    }
  };

  const takePicture = async () => {
    setIsLoadingImageAction(true);
    await getPermissionAsync();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePickingResult(result);

    setIsLoadingImageAction(false);
  };

  const pickImage = async () => {
    setIsLoadingImageAction(true);
    await getPermissionAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePickingResult(result);

    setIsLoadingImageAction(false);
  };

  return (
    <>
      {!isLoadingImageAction && (
        <>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.btnText}>Pick from library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.btnText}>Use camera</Text>
          </TouchableOpacity>
        </>
      )}
      {isLoadingImageAction && <ActivityIndicator size="large" color="#0000ff" />}
      {selectedImage && <Slider
        style={styles.slider}
        minimumValue={100}
        maximumValue={2400}
        step={1}
        value={imageSize}
        onValueChange={handleSliderChange}
      />}
      {selectedImage && <Text style={styles.sliderText}>Image size: {imageSize}px²</Text>}
      {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />}
    </>
  );
}

const styles = StyleSheet.create({
  slider: {
    width: 200,
    height: 40,
    margin: 2,
  },
  sliderText: {
    fontSize: 14,
  },
  button: {
    padding: 10,
    backgroundColor: '#3F72AF',
    borderRadius: 5,
    margin: 5,
    borderColor: '#112D4E',
    borderWidth: 1,
    shadowColor: '#112D4E',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#F9F7F7',
    fontWeight: '600',
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    margin: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
});