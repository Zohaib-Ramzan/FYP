import * as tf from '@tensorflow/tfjs';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as jpeg from 'jpeg-js';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as WebBrowser from 'expo-web-browser';
import ImagePickerAndResizer from './ImagePickerAndResizer';

let model;

export default function Predictions() {
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);

    useEffect(() => {
        if (!model) { // Only load the model if it's not already loaded
            loadModel();
        }
    }, []);

    const loadModel = async () => {
        console.log('Starting model loading...');
        await tf.ready();
        console.log('TensorFlow.js is ready...');

        console.log('Loading model...');
        model = await mobilenet.load(); // Load MobileNet model
        setIsModelLoaded(true);

        console.log('Model is loaded!');
    };


    const handlePredictPress = async () => {
        if (model && selectedImage) {
            console.log(selectedImage);
            setIsLoadingPredictions(true); // Start loading

            // Load image
            const response = await fetch(selectedImage.uri, {}, { isBinary: true });
            const imageData = await response.arrayBuffer();
            const rawImageData = jpeg.decode(imageData, true).data;

            // Remove alpha channel
            const rgbData = [];
            for (let i = 0; i < rawImageData.length; i += 4) {
                rgbData.push(rawImageData[i], rawImageData[i + 1], rawImageData[i + 2]);
            }

            const imageTensor = tf.tensor3d(rgbData, [selectedImage.height, selectedImage.width, 3]);

            // Preprocess image
            const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]); // Resize to 224x224 for MobileNet
            const batchedImageTensor = resizedImageTensor.expandDims(0);

            // Make prediction
            const predictions = await model.classify(batchedImageTensor, 7); // Use classify method

            // Print predictions in console
            console.log(predictions);

            // Set predictions state
            setPredictions(predictions);

            setIsLoadingPredictions(false); // End loading
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollViewContainer, { flex: selectedImage ? 0 : 1 }]} showsVerticalScrollIndicator={false}>
                <Text style={styles.modelText}>Model Loaded: {isModelLoaded ? 'Yes' : 'No , Please wait..'}</Text>
                {!isModelLoaded && <ActivityIndicator size="large" color="#0000ff" animating={!isModelLoaded} />}
                <ImagePickerAndResizer selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                {isLoadingPredictions ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handlePredictPress}>
                        <Text style={styles.btnText}>Predict</Text>
                    </TouchableOpacity>
                )}
                {predictions.length > 0 && <View style={styles.predictionsContainer}>
                    <Text style={styles.modelText}>Predictions:</Text>
                    {predictions.map((prediction, i) => (
                        <TouchableOpacity key={i} onPress={() => WebBrowser.openBrowserAsync(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(prediction.className)}`)}>
                            <Text style={styles.predictions}>{`${i + 1}: ${prediction.className} (${prediction.probability.toFixed(2)})`}</Text>
                        </TouchableOpacity>
                    ))}
                </View>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#F9F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
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
        color: '#F9F7F7',
        fontWeight: '600',
    },
    predictionsContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },


});