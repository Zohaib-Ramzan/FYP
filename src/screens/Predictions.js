import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView, View, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as jpeg from 'jpeg-js';
import * as WebBrowser from 'expo-web-browser';
import ImagePickerAndResizer from '../../Components/ImagePickerAndResizer';
import CustomText from '../components/CustomText';
import HeaderComp from '../components/HeaderComp';
import { useNavigation } from '@react-navigation/native';
import ButtonComp from '../components/ButtonComp';
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from '../../config';
import { AppContext } from '../hooks/Context';

export default function Predictions() {
    const {users} = useContext(AppContext);
    const navigation = useNavigation();
 const [isModelLoaded, setIsModelLoaded] = useState(false);
 const [selectedImage, setSelectedImage] = useState(null);
 const [predictions, setPredictions] = useState([]);
 const [labels, setLabels] = useState([]);
 const [model, setModel] = useState(null);
 const [types, setTypes] = useState('');
 const [confidence, setConfidence] = useState('');
 const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
 const [isImageSelected, setIsImageSelected] = useState(false)

 useEffect(() => {
    if (!model) { // Only load the model if it's not already loaded
      loadModel();
    }
 }, []);

 const loadModel = async () => {
    console.log('Starting model loading...');
    await tf.ready();
    console.log('TensorFlow.js is ready...');
    const modelJson = require('../../assets/tfjs_model/model.json');

    const modelWeights = [
        require("../../assets/tfjs_model/group1-shard1of5.bin"),
        require("../../assets/tfjs_model/group1-shard2of5.bin"),
        require("../../assets/tfjs_model/group1-shard3of5.bin"),
        require("../../assets/tfjs_model/group1-shard4of5.bin"),
        require("../../assets/tfjs_model/group1-shard5of5.bin"),
      ];
  
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeights),
      );
      console.log(model.summary());
  
      setIsModelLoaded(true);
      setModel(model)
  
      // Load labels
      console.log('Loading labels...');
      loadedLabels = require('../../assets/tfjs_model/labels.json');
      setLabels(loadedLabels);
      console.log('Labels are loaded...');
      console.log('Model is loaded...');
   };

 const handlePress = async () => {
    if (model && selectedImage && labels.length > 0) {
        console.log(selectedImage.uri);
        setIsLoadingPredictions(true); // Start loading
        // Load image
        const response = await fetch(selectedImage.uri, {}, { isBinary: true });
        const imageData = await response.arrayBuffer();
        const rawImageData = jpeg.decode(imageData, true).data;
        
        // Remove alpha channel
        const rgbData = [];
        for (let i = 0; i < rawImageData.length; i += 4) {
            rgbData.push(rawImageData[i], rawImageData[i+1], rawImageData[i+2]);
        }

        let imageTensor = tf.tensor3d(rgbData, [selectedImage.height, selectedImage.width, 3]).resizeNearestNeighbor([150,150]).expandDims().toFloat().reverse(-1);

        // Preprocess image
    //   const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [150,150]);
    //   const offset = tf.scalar(127.5);
    //   const normalizedImageTensor = resizedImageTensor.sub(offset).div(offset);
    //   const batchedImageTensor = normalizedImageTensor.expandDims(0);

        // Make prediction
        const prediction = model.predict(imageTensor);

        // Log raw prediction output
        console.log('Raw prediction output:', prediction.dataSync());

        // Set predictions state
        const values = prediction.dataSync();
        const indices = prediction.argMax(-1).dataSync();

        const newPredictions = labels.map((label, index) => ({
            label,
            probability: values[index] || 0, // Use 0 if the probability is undefined
        }));

        // Sort predictions by probability in descending order
        newPredictions.sort((a, b) => b.probability - a.probability);

        // Update predictions state
        setPredictions(newPredictions);

        // Set the type to the label with the highest probability
        if (newPredictions.length > 0) {
            setTypes(newPredictions[0].label); // Set type to the label with the highest probability
            setConfidence(newPredictions[0].probability.toFixed(2))
            {console.log("New Pred" + types)}
        }

        setIsLoadingPredictions(false); // End loading
        
        // savePrediction();

        // Print top 4 predictions
        newPredictions.slice(0, 4).forEach((prediction, index) => {
            console.log(`${index + 1}: ${prediction.label} (${prediction.probability.toFixed(2)})`);
        });
    }
};

useEffect(() => {
    if (types && confidence) {
        savePrediction();
    }
}, [types, confidence]);

const savePrediction = async (uid=users.uid, imageUrl=selectedImage.uri,type=types, probability=confidence ) => {
    try {
      const predictionData = {
        uid: uid,
        imageUrl: imageUrl,
        type: type,
        probability: probability,
        timestamp: new Date().toISOString(),
      };
      {console.log("Type is =>" + types)}
  
      await addDoc(collection(FIRESTORE_DB, "predictions"), predictionData);
  
      // Handle successful save
    } catch (error) {
      // Handle error
      console.error("Error saving prediction:", error);
    }
  };


 return (
    <SafeAreaView style={styles.container}>
    <HeaderComp onPress={()=> navigation.goBack()} />
    <View style={styles.body_container}>
        <ScrollView contentContainerStyle={[styles.scrollViewContainer, { flex: selectedImage ? 0 : 1 }]} showsVerticalScrollIndicator={false}>
            {!isModelLoaded ? (
                <>
                    <CustomText style={styles.modelText}>Loading model, Please wait..</CustomText>
                    <ActivityIndicator size="large" color="#0000ff" animating={!isModelLoaded} />
                </>
            ) : (
                <>
                    <ImagePickerAndResizer selectedImage={selectedImage} setSelectedImage={setSelectedImage} isImageSelected={(isImageSelected) => {setIsImageSelected(isImageSelected)}} />
                    {isLoadingPredictions ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        // <TouchableOpacity style={styles.button} onPress={handlePress}>
                        //     <CustomText style={styles.btnText}>Predict</CustomText>
                        // </TouchableOpacity>
                    //   <CustomText>Loading...</CustomText>
                    isImageSelected && (
                        <ButtonComp btnStyle={styles.btnText} text={'Predict'} onPress={handlePress}></ButtonComp> // its working 
                    )
                    )}
                    {predictions.length > 0 && (
                        <View style={styles.predictionsContainer}>
                            <CustomText style={styles.modelText}>Predictions:</CustomText>
                            {predictions.map((prediction, i) => (
                        <TouchableOpacity key={i} onPress={() => WebBrowser.openBrowserAsync(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(prediction.label)}`)}>
                            <CustomText style={styles.predictions}>{`${i + 1}: ${prediction.label} (${prediction.probability.toFixed(2)})`}</CustomText>
                        </TouchableOpacity>
                    ))}
                        </View>
                    )}
                </>
            )}
        </ScrollView>
    </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    body_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    scrollViewContainer: {
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    predictions: {
        textAlign: 'left',
        color: '#112D4E',
        fontSize: 16,
        margin: 10,
        fontWeight: 'bold',
    },
    modelText: {
        textAlign: 'center',
        fontSize: 22,
        margin: 8,
        fontWeight: 'bold',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
    predictionsContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },


});