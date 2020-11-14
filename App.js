/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text
} from 'react-native';
import Button from './components/Button';
import WordList from './components/WordList';
import WordModal from './components/WordModal';
import AsyncStorageService from './services/AsyncStorage.service';
import Spinner from './components/Spinner';

const App: () => React$Node = () => {
  const [words, setWords] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getWords = async () => {
    setLoadingState(true);
    let words = await AsyncStorageService.getData('@words');
    setLoadingState(false);
    words = words ?? [];
    setWords(words);
  };
  useEffect(() => {
    getWords();
  }, []);

  const setModalVisbility = async (isVisible) => {
    setIsModalVisible(isVisible);
    !isVisible && await getWords();
  };

  const setLoadingState = (isLoading) => {
    setIsLoading(isLoading);
  };

  const addButtonPressed = () => {
    setModalVisbility(true);
  }
  
  const clearButtonPressed = async () => {
    await AsyncStorageService.clearAll();
    await getWords();
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <WordList words={words}/>
        <View style={styles.addButtonContainer}>
          <Button 
            imageSource={require('./assets/add.png')} 
            onPress={addButtonPressed}
            height={60}
            width={60}
          />
          {/* <Button 
            onPress={clearButtonPressed}
            height={60}
            width={60}
          ><Text>Clear Words</Text></Button> */}
        </View>        
        {isModalVisible && 
          <WordModal 
            isVisible={isModalVisible}
            setModalVisbility={setModalVisbility}
            setLoadingState={setLoadingState}
          />
        }
        <Spinner isSpinning={isLoading}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  addButtonContainer: {
    alignItems: 'center',
    marginVertical: 50
  }
});

export default App;
