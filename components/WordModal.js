
import React, {useState} from 'react';
import {
    StyleSheet,
    View, 
    Modal,
    TextInput
} from 'react-native';
import Button from './Button';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

const WordModal = (props) => {
    const {isVisible, setModalVisbility} = props;
    const [isFocused, setIsFocused] = useState(false);
    const [word, setWord] = useState(undefined);

    const handleFocus = () => {
      setIsFocused(true);      
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const addButtonPressed = async () => {
      setModalVisbility(false, word);
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
                      onChangeText={setWord}
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