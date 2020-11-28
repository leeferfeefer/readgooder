import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text
} from 'react-native';
import {version} from './package.json';
import Navigation from './navigation/Navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>  
        <Text style={{textAlign: 'center'}}>v{version}</Text>
        <Navigation/>
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
