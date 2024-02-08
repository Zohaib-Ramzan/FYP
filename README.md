# TensorflowReactNative

This React Native app, powered by TensorFlow.js, offers real-time image classification. Users can capture photos using the device's camera or analyze objects in real-time, providing instant insights into object and scene identification through machine learning.

## Project Structure

- `App.js`: This is the main entry point of the application. It sets up the navigation and the screens of the app.

- `Components/`: This directory contains the main components of the application:
  - `BoundingBox.js`: This component is responsible for rendering bounding boxes around detected objects in an image.
  - `ImagePickerAndResizer.js`: This component allows the user to pick an image from their device and resizes it for prediction or detection.
  - `ObjectDetection.js`: This component handles object detection in selected images.
  - `Predictions.js`: This component handles image prediction for selected images.

- `assets/tfjs_model/`: This directory contains the TensorFlow.js model (`model.json`) and the labels (`labels.json`) used for image prediction and object detection.

- `package.json`: This file lists the project dependencies and scripts.

## Installation

To install the project, you need to have Node.js and npm installed. Then, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/Alexis-Papazoglou/TensorflowReactNative.git
cd TensorflowReactNative
npm install
```

## Running the Application
To start the application, run:
```
npm start
 ```
This will start the Metro Bundler and you can open the app in an emulator or on a physical device.

## Features
- Image Prediction: This feature allows users to select an image and get predictions about what the image contains.

- Object Detection: This feature allows users to select an image and detect objects within the image. Detected objects are highlighted with bounding boxes.

## Contributing
Contributions are welcome. Please open an issue to discuss your ideas or submit a pull request with your changes.
