
import React, {useState} from 'react';
import {
    StyleSheet,
    View, 
    Modal,
    TextInput
} from 'react-native';
import Button from './Button';
import AsyncStorageService from '../services/AsyncStorage.service';
import Word from '../models/Word';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

const WordModal = (props) => {
    const {isVisible, setModalVisbility, setLoadingState} = props;
    const [isFocused, setIsFocused] = useState(false);
    const [word, setWord] = useState('');

    const handleFocus = (event) => {
      setIsFocused(true);      
    };

    const handleBlur = (event) => {
      setIsFocused(false);
    };

    const addButtonPressed = async () => {
      if (word !== '') {
        setLoadingState(true);
        const words = await AsyncStorageService.getData('@words');        
        if (!!!words) {
          const wordObj = new Word(word, 'def', 0);
          await AsyncStorageService.storeData([wordObj], '@words');
        } else {
          if (!words.some(addedWord => addedWord.word === word)) {      
            const lastWord = words[words.length-1];     
            const newWord = new Word(word, 'def', lastWord.id+1);                 
            await AsyncStorageService.storeData([...words, newWord], '@words');
          }
        } 
        setLoadingState(false);        
      }
      setModalVisbility(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
              setModalVisbility(false); 
            }}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <TextInput 
                      style={styles.inputField}
                      placeholder='Add Word'
                      selectionColor={BLUE}
                      underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY}              
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChangeText={(text) => {
                        setWord(text);
                      }}
                      value={word}
                    />
                    <Button 
                      imageSource={require('../assets/add.png')} 
                      onPress={addButtonPressed}
                      height={30}
                      width={30}
                    />
                </View>
            </View>
      </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      modalView: {
        width: '80%',
        height: 200,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      inputField: {
        fontSize: 20,
        height: 50,
        width: '90%',
        marginVertical: 30
      }      
});

export default WordModal;