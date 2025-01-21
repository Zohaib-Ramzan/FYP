import React from 'react';
import { StatusBar, StyleSheet ,Platform, Dimensions, View} from 'react-native';
import '@tensorflow/tfjs-react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HeaderComp from '../components/HeaderComp';
import SettingScreen from './Settings';
import Resources from './Resources';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Home from './Home';

const Tab = createBottomTabNavigator();

const { height: screenHeight } = Dimensions.get('window');
console.log(screenHeight);

const isIphoneXOrNewer =
  Platform.OS === 'ios' && (screenHeight > 812);

const MainScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#c4c4c4',
          tabBarLabelStyle: {
            fontSize: responsiveFontSize(1.5),
          },
          tabBarStyle: styles.tabBar,
          headerShown: false,
          
        }}
        initialRouteName='Home'
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Resources"
          component={Resources}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="reader" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

  tabBar: {
    backgroundColor: '#6200EE',
    paddingVertical: 1,
    height: isIphoneXOrNewer ? 80 : 50, 
    borderTopColor: '#6200EE',
  },
});

export default MainScreen;
