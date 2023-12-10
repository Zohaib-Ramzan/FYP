import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Asset } from 'expo-asset';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as jpeg from 'jpeg-js';
import { GLView } from 'expo-gl';
import { Camera } from 'expo-camera';
import * as mobilenet from '@tensorflow-models/mobilenet'; // Import MobileNet
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

let model; // Declare model variable outside of the component

export default function ModelingSelectedLibrary() {
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadModel = async () => {
        console.log('Starting model loading...');
        await tf.ready();
        console.log('TensorFlow.js is ready...');

        console.log('Loading model...');
        model = await mobilenet.load(); // Load MobileNet model
        setIsModelLoaded(true);

        console.log('Model is loaded...');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            const image = result.assets[0];
            if (image.uri) {
                Image.getSize(image.uri, (width, height) => {
                    setSelectedImage({ uri: image.uri, width, height });
                }, error => {
                    console.error(`Failed to get size for image: ${error.message}`);
                });
            } else {
                console.error('No image URI returned from ImagePicker');
            }
        }
    };

    const handlePress = async () => {
        if (model && selectedImage) {
            setIsLoading(true); // Start loading

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
            const predictions = await model.classify(batchedImageTensor); // Use classify method

            // Print predictions in console
            console.log(predictions);

            // Set predictions state
            setPredictions(predictions);

            setIsLoading(false); // End loading
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
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text>Pick an image</Text>
            </TouchableOpacity>
            {selectedImage && <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200 }} />}
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text>Predict</Text>
                </TouchableOpacity>
            )}
            {predictions.map((prediction, i) => (
                <Text key={i}>{`${i + 1}: ${prediction.className} (${prediction.probability.toFixed(2)})`}</Text>
            ))}
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