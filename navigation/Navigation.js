import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WordViewer from '../screens/WordViewer';
import WordGame from '../screens/WordGame';

const Tab = createBottomTabNavigator();

const WordViewerScreen = () => {
  return <WordViewer/>;
}

const WordGameScreen = () => {
  return <WordGame/>;
};

const Navigation = () => {
    return (
        <NavigationContainer>  
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Words') {
                  iconName = focused ? 'md-library' : 'md-library-outline';
                } else if (route.name === 'Game') {
                  iconName = focused ? 'md-game-controller' : 'md-game-controller-outline';
                }    
                return <Ionicons name={iconName} size={size} color={color}/>;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Words" component={WordViewerScreen}/>
            <Tab.Screen name="Game" component={WordGameScreen}/>
          </Tab.Navigator>
        </NavigationContainer>   
    );
};

export default Navigation;