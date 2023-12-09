import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Asset } from 'expo-asset';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import * as jpeg from 'jpeg-js';
import { GLView } from 'expo-gl';
import { Camera } from 'expo-camera';

let model; // Declare model variable outside of the component
let labels; // Declare labels variable outside of the component

export default function Modeling() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  const loadModel = async () => {
    console.log('Starting model loading...');
    await tf.ready();
    console.log('TensorFlow.js is ready...');
    const modelJson = require('../assets/tfjs_model/model.json');
    const modelWeights = [
      require('../assets/tfjs_model/group1-shard1of23.bin'),
      require('../assets/tfjs_model/group1-shard2of23.bin'),
      require('../assets/tfjs_model/group1-shard3of23.bin'),
      require('../assets/tfjs_model/group1-shard4of23.bin'),
      require('../assets/tfjs_model/group1-shard5of23.bin'),
      require('../assets/tfjs_model/group1-shard6of23.bin'),
      require('../assets/tfjs_model/group1-shard7of23.bin'),
      require('../assets/tfjs_model/group1-shard8of23.bin'),
      require('../assets/tfjs_model/group1-shard9of23.bin'),
      require('../assets/tfjs_model/group1-shard10of23.bin'),
      require('../assets/tfjs_model/group1-shard11of23.bin'),
      require('../assets/tfjs_model/group1-shard12of23.bin'),
      require('../assets/tfjs_model/group1-shard13of23.bin'),
      require('../assets/tfjs_model/group1-shard14of23.bin'),
      require('../assets/tfjs_model/group1-shard15of23.bin'),
      require('../assets/tfjs_model/group1-shard16of23.bin'),
      require('../assets/tfjs_model/group1-shard17of23.bin'),
      require('../assets/tfjs_model/group1-shard18of23.bin'),
      require('../assets/tfjs_model/group1-shard19of23.bin'),
      require('../assets/tfjs_model/group1-shard20of23.bin'),
      require('../assets/tfjs_model/group1-shard21of23.bin'),
      require('../assets/tfjs_model/group1-shard22of23.bin'),
      require('../assets/tfjs_model/group1-shard23of23.bin'),
    ];
    console.log('got the paths');

    console.log('Loading model...');
    model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    setIsModelLoaded(true);

    // Load labels
    console.log('Loading labels...');
    labels = require('../assets/tfjs_model/labels.json');
    console.log('Labels are loaded...');
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
      const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [299, 299]);
      const offset = tf.scalar(127.5);
      const normalizedImageTensor = resizedImageTensor.sub(offset).div(offset);
      const batchedImageTensor = normalizedImageTensor.expandDims(0);

      // Make prediction
      const prediction = model.predict(batchedImageTensor);
      const top10 = prediction.topk(10);
      const indices = await top10.indices.data();
      const values = await top10.values.data();

      // Print top 10 predictions
      for (let i = 0; i < 10; i++) {
        console.log(`${i + 1}: ${labels[indices[i]]} (${values[i].toFixed(2)})`);
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