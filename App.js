import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text
} from 'react-native';
import {version} from './package.json';
import WordViewer from './screens/WordViewer';
import WordGame from './screens/WordGame';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const WordViewerScreen = () => {
  return <WordViewer/>;
}

const WordGameScreen = () => {
  return <WordGame/>;
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>  
        <Text style={{textAlign: 'center'}}>v{version}</Text>
        <NavigationContainer>  
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'WordViewer') {
                  iconName = focused ? 'md-library' : 'md-library-outline';
                } else if (route.name === 'WordGame') {
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  }
});

export default App;
