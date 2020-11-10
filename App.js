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
} from 'react-native';
import Button from './components/Button';
import WordList from './components/WordList';
import WordModal from './components/WordModal';

const App: () => React$Node = () => {
  const [words, setWords] = useState([
    {word: 'word 1', id: '0', definition: 'poop balls the third went to town riding on his pony'},
    {word: 'word 2', id: '1', definition: 'poop balls the third went to town riding on his pony'},
    {word: 'word 3', id: '2', definition: 'poop balls the third went to town riding on his pony'}
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setModalVisbility = (isVisible) => {
    setIsModalVisible(isVisible);
  };

  const addButtonPressed = () => {
    setModalVisbility(true);
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
        </View>        
        {isModalVisible && 
          <WordModal 
            isVisible={isModalVisible}
            setModalVisbility={setModalVisbility}
          />
        }
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
