import { StyleSheet, View, Dimensions, Platform, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import Canvas from 'react-native-canvas';

const TensorCamera = cameraWithTensors(Camera);

const { width, height } = Dimensions.get('window');

export default function ObjectDetection() {
    const [model, setModel] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
    let context = useRef(null);
    const canvas = useRef(null);

    const handleCameraStream = (images) => {
        const loop = async () => {
            if (!isDetecting) {
                return;
            }

            const nextImageTensor = images.next().value;

            if (model && nextImageTensor) {
                const predictions = await model.detect(nextImageTensor);
                drawRectangle(predictions, nextImageTensor);

                // Dispose of tensor to free up memory
                nextImageTensor.dispose();
            }

            requestAnimationFrame(loop);
        };
        loop();
    };

    const drawRectangle = async (predictions, nextImageTensor) => {
        const highScorePredictions = predictions.filter(prediction => prediction.score > 0.3);
        if (context.current && canvas.current) {
            const scaleWidth = width / nextImageTensor.shape[1];
            const scaleHeight = height / nextImageTensor.shape[0];

            const flipHorizontal = Platform.OS === 'ios' ? false : true;

            context.current.clearRect(0, 0, width, height);

            highScorePredictions.forEach(async prediction => {
                const [x, y, width, height] = prediction.bbox;

                const boundingBoxX = flipHorizontal
                    ? canvas.current.width - x * scaleWidth - width * scaleWidth
                    : x * scaleWidth;
                const boundingBoxY = y * scaleHeight;

                context.current.strokeRect(
                    boundingBoxX,
                    boundingBoxY,
                    width * scaleWidth,
                    height * scaleHeight
                );

                context.current.fillText(
                    `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
                    boundingBoxX > 10 ? boundingBoxX - 10 : 0,
                    boundingBoxY > 10 ? boundingBoxY - 10 : 10
                );
            });
        }
    };


    const handleCanvas = (can) => {
        if (can) {
            can.width = width;
            can.height = height;
            const ctx = can.getContext('2d');
            context.current = ctx;
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.lineWidth = 2;
            canvas.current = can;
            ctx.font = '20px helvetica';
        }
    };

    const startDetection = () => {
        setIsDetecting((detection) => !detection);
    };

    const switchCamera = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    let textureDims;
    Platform.OS === 'ios'
        ? (textureDims = { height: 1920, width: 1080 })
        : (textureDims = { height: 1200, width: 1600 });

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await tf.ready();
            setModel(await cocoSsd.load());
        })();
    }, []);

    return (
        <View style={styles.container}>
            {model && isDetecting && (
                <>
                    <TensorCamera
                        style={styles.camera}
                        type={cameraType}
                        cameraTextureHeight={textureDims.height}
                        cameraTextureWidth={textureDims.width}
                        resizeHeight={200}
                        resizeWidth={152}
                        resizeDepth={3}
                        onReady={handleCameraStream}
                        autorender={true}
                    />
                    <Canvas style={styles.canvas} ref={handleCanvas} />
                </>
            )}
            {!model &&
                <View style={styles.loadingContainer}>
                    <Text style={styles.modelText}>Loading model, Please wait..</Text>
                    <ActivityIndicator size="large" color="blue" />
                </View>

            }
            {model && (
                <TouchableOpacity style={styles.btn1} onPress={startDetection}>
                    <Text style={styles.btnText}>{isDetecting ? 'Stop detection' : 'Start detection'}</Text>
                </TouchableOpacity>
            )}
            {isDetecting && <TouchableOpacity style={styles.btn2} onPress={switchCamera}>
                <Text style={styles.btnText}>Switch camera</Text>
            </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F7F7',
    },
    camera: {
        width: '90%',
        height: '100%',
    },
    canvas: {
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        height: '100%',
    },
    btn1: {
        bottom: 10,
        position: 'absolute',
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
        zIndex: 120,
    },
    btn2: {
        bottom: 60,
        position: 'absolute',
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
        zIndex: 120,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#F9F7F7',
        fontWeight: '600',
    },
    modelText: {
        textAlign: 'center',
        fontSize: 22,
        margin: 8,
        fontWeight: 'bold',
    },
});