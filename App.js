import React from 'react';
import { StatusBar } from 'react-native';
import '@tensorflow/tfjs-react-native';
import Predictions from './Components/Predictions';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
      <Predictions />
    </>
  );
};

export default App;