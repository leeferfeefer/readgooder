import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';
import Navigation from './app/navigation/Navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={styles.container}>  
        <Navigation/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
