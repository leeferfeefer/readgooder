import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';
import Button from './Button';
import Styles from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import SoundParserService from '../services/SoundParser.service';
import Sound from 'react-native-sound';

const WordCard = (props) => {
    const {item, setDeleteWordConfirmSheetVisibility} = props;

    const [isWordPressed, setIsWordPressed] = useState(false);

    const onWordPress = () => {
        setIsWordPressed(!isWordPressed);
    };

    const onWordLongPress = () => {
        setDeleteWordConfirmSheetVisibility(true, item.id);
    };

    const onPronounceButtonPressed = (audioFileName) => {
        const soundURL = SoundParserService.parse(audioFileName);
        const track = new Sound(soundURL, null, (e) => {
            if (e) {
                Alert.showAlert("Ahem!", "Could not play pronunciation. Try again.");
            } else {
                track.play();
            }
        });
    };

    const getDefinitions = () => {
        return item?.definition.map((rgDefinition, index) => {
            return (
                <View key={`${index}_container`} style={{marginBottom: 10, flex: 1}}>
                    <Text key={`${index}_pos`} style={styles.partOfSpeech}>{rgDefinition.partOfSpeech}</Text>    
                    {rgDefinition.audioFileName && 
                        <Button
                            key={`${index}_sound`}
                                width={20} 
                                height={20} 
                                onPress={() => onPronounceButtonPressed(rgDefinition.audioFileName)} 
                                imageSource={require('../assets/pronounce.png')}
                            />                   
                    }                                     
                    <Text key={`${index}_def`} style={styles.definition}>{rgDefinition.definition}</Text>
                </View>                
            )
        });
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.card}>
                <Button onPress={onWordPress} onLongPress={onWordLongPress} width={'100%'} height={'20%'}>
                    <Text style={styles.word}>{item.word}</Text>                        
                </Button>            
                {isWordPressed && 
                    <ScrollView>             
                        {getDefinitions()}
                    </ScrollView> 
                }   
            </View>      
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('screen').width,
        flex: 1
    },
    card: {
        margin: 10,
        backgroundColor: Styles.WordViewerCardBackgroundColor,
        borderRadius: 20,
        flex: 1,
        paddingHorizontal: 10
    },
    word: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    definition: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 5
    },
    partOfSpeech: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold'
    }
});

export default WordCard;
