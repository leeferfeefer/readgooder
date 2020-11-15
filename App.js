/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, createRef} from 'react';
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
import WordDeletionActionSheet from './components/WordDeletionActionSheet';
import Word from './models/Word';
import Alert from './components/Alert';
import DictionaryService from './services/Dictionary.service';
import DefinitionParser from './services/DefinitionParser.service';

const actionSheetRef = createRef();

const App: () => React$Node = () => {
  const [words, setWords] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wordIDToDelete, setWordIDToDelete] = useState(undefined);

  const getWords = async (controlLoading = true) => {
    controlLoading && setLoadingState(true);
    let words = await AsyncStorageService.getData('@words');
    controlLoading && setLoadingState(false);
    words = words ?? [];
    setWords(words);
  };
  useEffect(() => {
    getWords();
  }, []);

  const setModalVisbility = async (isVisible, wordToAdd) => {
    setIsModalVisible(isVisible);    
    !isVisible && !!wordToAdd && await addWord(wordToAdd);
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

  const setDeleteWordConfirmSheetVisibility = (isVisible, wordID) => {
    if (isVisible) {
      setWordIDToDelete(wordID);     
    }
    actionSheetRef.current?.setModalVisible(isVisible);

  }

  const onDeleteWordPress = async () => {
    setDeleteWordConfirmSheetVisibility(false);
    await deleteWord();
  }

  const addWord = async (wordToAdd) => {
    setLoadingState(true);  
    try {
      const definitionResponse = await DictionaryService.getDefintion(wordToAdd);
      const definition = DefinitionParser.parse(wordToAdd, definitionResponse);
      const addedWords = await AsyncStorageService.getData('@words');        
      if (!!!addedWords || addedWords.length === 0) {
        const wordObj = new Word(wordToAdd, definition, 0);
        await AsyncStorageService.storeData([wordObj], '@words');
      } else {
        if (!addedWords.some(addedWord => addedWord.word.toLowerCase() === wordToAdd.toLowerCase())) {      
          const lastWord = addedWords[addedWords.length-1];     
          const newWord = new Word(wordToAdd, definition, lastWord.id+1);                 
          await AsyncStorageService.storeData([...addedWords, newWord], '@words');
        } else {
          Alert.showAlert("Ahem!", "You already done did added that ya dummy!");
        }
      } 
      await getWords(false);
    } catch (error) {
      Alert.showAlert("Ahem!", "Could not add word. Try again.");
    }
    setLoadingState(false);   
  };

  const deleteWord = async () => {
    setLoadingState(true);
    const words = await AsyncStorageService.getData('@words');        
    if (!!words) {
      const newWords = words.filter(word => word.id !== wordIDToDelete);
      await AsyncStorageService.storeData(newWords, '@words');
    } 
    await getWords(false);
    setLoadingState(false);
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <WordList words={words} setDeleteWordConfirmSheetVisibility={setDeleteWordConfirmSheetVisibility}/>
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
          />
        }
        <WordDeletionActionSheet actionSheetRef={actionSheetRef} onButtonPress={onDeleteWordPress}/>
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
