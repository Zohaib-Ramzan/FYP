import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Asset } from 'expo-asset';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import * as jpeg from 'jpeg-js';
import { GLView } from 'expo-gl';
import { Camera } from 'expo-camera';
import * as mobilenet from '@tensorflow-models/mobilenet'; // Import MobileNet

let model; // Declare model variable outside of the component

export default function Modeling() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  const loadModel = async () => {
    console.log('Starting model loading...');
    await tf.ready();
    console.log('TensorFlow.js is ready...');

    console.log('Loading model...');
    model = await mobilenet.load(); // Load MobileNet model
    setIsModelLoaded(true);

    console.log('Model is loaded...');
  };

  const handlePress = async () => {
    if (model) {
      // Load image
      const imageAssetPath = Image.resolveAssetSource(require('../assets/1.jpg'));
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const imageData = await response.arrayBuffer();
      const rawImageData = jpeg.decode(imageData, true).data;
      
      // Remove alpha channel
      const rgbData = [];
      for (let i = 0; i < rawImageData.length; i += 4) {
        rgbData.push(rawImageData[i], rawImageData[i+1], rawImageData[i+2]);
      }
      
      const imageTensor = tf.tensor3d(rgbData, [imageAssetPath.height, imageAssetPath.width, 3]);

      // Preprocess image
      const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]); // Resize to 224x224 for MobileNet
      const batchedImageTensor = resizedImageTensor.expandDims(0);

      // Make prediction
      const predictions = await model.classify(batchedImageTensor); // Use classify method

      // Print top 10 predictions
      for (let i = 0; i < Math.min(10, predictions.length); i++) {
        console.log(`${i + 1}: ${predictions[i].className} (${predictions[i].probability.toFixed(2)})`);
      }
    }
  };

  useEffect(() => {
    if (!model) { // Only load the model if it's not already loaded
      loadModel();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Model Loaded: {isModelLoaded ? 'Yes' : 'No'}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text>Predict</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'skyblue',
  },
});