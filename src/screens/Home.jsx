import React from 'react';
import { StatusBar, StyleSheet ,Platform, Dimensions, View} from 'react-native';
import '@tensorflow/tfjs-react-native';
import Predictions from '../../Components/Predictions';
import ObjectDetection  from '../../Components/ObjectDetection';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HeaderComp from '../components/HeaderComp';

const Tab = createBottomTabNavigator();

const { height: screenHeight } = Dimensions.get('window');
console.log(screenHeight);

const isIphoneXOrNewer =
  Platform.OS === 'ios' && (screenHeight > 812);

const App = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
      <HeaderComp onPress={() => navigation.goBack()} />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3F72AF',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: styles.tabBar,
          headerShown: false,
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
        {/* <Tab.Screen
          name="Object Detection"
          component={ObjectDetection}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-search" color={color} size={size} />
            ),
          }}
        /> */}
      </Tab.Navigator>
      </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

  tabBar: {
    backgroundColor: 'white',
    paddingVertical: 1,
    height: isIphoneXOrNewer ? 80 : 50, 
    borderTopColor: '#3F72AF',
  },
});

export default App;
