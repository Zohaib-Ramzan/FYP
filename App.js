import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import '@tensorflow/tfjs-react-native';
import Predictions from './Components/Predictions';
import ObjectDetection from './Components/ObjectDetection';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3F72AF',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Image Prediction"
          component={Predictions}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-images" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Object Detection"
          component={ObjectDetection}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-search" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

styles = StyleSheet.create({

  tabBar: {
    backgroundColor: 'white',
    paddingVertical: 1,
    height: 50,
    borderTopColor: '#3F72AF',
  },
});

export default App;
