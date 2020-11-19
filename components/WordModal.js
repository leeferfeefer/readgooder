
import React, {useState} from 'react';
import {
    StyleSheet,
    View, 
    Modal,
    TextInput,
    Text
} from 'react-native';
import Button from './Button';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

const WordModal = (props) => {
    const {isVisible, setModalVisbility} = props;
    const [isFocused, setIsFocused] = useState(false);
    const [word, setWord] = useState(undefined);
    const [isValidationError, setIsValidationError] = useState(false);

  
    const handleFocus = () => {
      setIsFocused(true);      
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const addButtonPressed = async () => {
      setModalVisbility(false, word);
    }

    const handleChangeText = (word) => {
      setWord(word);    
      setIsValidationError(!(/^(?:[A-Za-z]+|\d+)$/.test(word)));
    };

    const getUnderlineColor = () => {
      if (isValidationError) {
        return 'red'
      };
      if (isFocused) {
        return BLUE;
      }
      return LIGHT_GRAY;
    };

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
                      underlineColorAndroid={getUnderlineColor()}              
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChangeText={handleChangeText}
                      value={word}
                    />
                    {isValidationError && <Text style={styles.errorMessage}>Only letters!</Text>}
                    <Button
                      style={styles.addButtonStyle}
                      onPress={addButtonPressed}   
                      isDisabled={isValidationError}           
                    ><Text>Add</Text></Button>
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
      },
      addButtonStyle: {
        height: 30, 
        width: 100,
        backgroundColor: LIGHT_GRAY,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
      },
      errorMessage: {
        color: 'red'
      }      
});

export default WordModal;