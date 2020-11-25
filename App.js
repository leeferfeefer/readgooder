import React, {useState, useEffect, createRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';
import {version} from './package.json';
import WordViewer from './screens/WordViewer';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>      
        <WordViewer/>
        <Text>v{version}</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});

export default App;
