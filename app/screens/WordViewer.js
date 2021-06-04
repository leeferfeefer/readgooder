import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Button from '../components/Button';
import WordList from '../components/WordList';
import WordModal from '../components/WordModal';
import AsyncStorageService from '../services/AsyncStorage.service';
import Spinner from '../components/Spinner';
import WordDeletionActionSheet from '../components/WordDeletionActionSheet';
import Word from '../models/Word';
import Alert from '../components/Alert';
import DictionaryService from '../services/Dictionary.service';
import DefinitionParser from '../services/DefinitionParser.service';
import {version} from '../../package.json';
import Styles from '../../styles';

const actionSheetRef = createRef();

const WordViewer = () => {
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
    Alert.showAlert("Ahem!", "Are you sure you want to delete all words?", async () => {
      await AsyncStorageService.clearAll();
      await getWords();
    });
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
      const definitions = DefinitionParser.parse(wordToAdd, definitionResponse);
      if (!!!definitions || definitions.length === 0) {
        throw new Error("Not a word");
      }
      const addedWords = await AsyncStorageService.getData('@words');        
      if (!!!addedWords || addedWords.length === 0) {
        const wordObj = new Word(wordToAdd, definitions, 0);
        await AsyncStorageService.storeData([wordObj], '@words');
      } else {
        if (!addedWords.some(addedWord => addedWord.word.toLowerCase() === wordToAdd.toLowerCase())) {      
          const lastWord = addedWords[addedWords.length-1];     
          const newWord = new Word(wordToAdd, definitions, lastWord.id+1);                 
          await AsyncStorageService.storeData([...addedWords, newWord], '@words');
        } else {
          Alert.showAlert("Ahem!", "You already done did added that ya dummy!");
        }
      } 
      await getWords(false);
    } catch (error) {
      Alert.showAlert("Ahem!", `Could not add word. Try again. \n\nError: ${error.message}`);
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
    <View style={styles.container}>
      <WordList words={words} setDeleteWordConfirmSheetVisibility={setDeleteWordConfirmSheetVisibility}/>
      <View style={styles.addButtonContainer}>
        <Button 
          imageSource={require('../../assets/add.png')} 
          onPress={addButtonPressed}
          height={60}
          width={60}
        />
        <View style={{marginTop: 40}}>
          <Button 
            onPress={clearButtonPressed}
            height={60}
            width={100}
          ><Text style={{textAlign: 'center'}}>Clear Words</Text></Button>
        </View>
      </View>        
      {isModalVisible && 
        <WordModal 
          isVisible={isModalVisible}
          setModalVisbility={setModalVisbility}
        />
      }
      <WordDeletionActionSheet actionSheetRef={actionSheetRef} onButtonPress={onDeleteWordPress}/>
      <Spinner isSpinning={isLoading}/>
      <Text style={{textAlign: 'center'}}>v{version}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.WordViewerBackgroundColor
  },
  addButtonContainer: {
    alignItems: 'center',
    marginVertical: 50
  }
});

export default WordViewer;
