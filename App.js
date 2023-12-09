import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { GLView } from 'expo-gl';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import Modeling from './Components/Modeling';
import { Camera } from 'expo-camera';

const App = () => {
  const [isTfReady, setTfReady] = useState(false);

  useEffect(() => {
    const prepareTf = async () => {
      await tf.ready();
      setTfReady(true);
    };

    prepareTf();
  }, []);

  // Render your component
  if (!isTfReady) {
    return <Text>Loading TensorFlow.js...</Text>;
  }

  return <Modeling></Modeling>;
};

export default App;