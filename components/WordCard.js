import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView
} from 'react-native';
import Button from './Button';

const LIGHT_GRAY = "#D3D3D3";

const WordCard = (props) => {
    const {item, setDeleteWordConfirmSheetVisibility} = props;

    const [isWordPressed, setIsWordPressed] = useState(false);

    const onWordPress = () => {
        setIsWordPressed(!isWordPressed);
    };

    const onWordLongPress = () => {
        setDeleteWordConfirmSheetVisibility(true, item.id);
    };

    return (
        <View style={styles.itemContainer}>
            <Button onPress={onWordPress} onLongPress={onWordLongPress} width={'100%'} height={'100%'}>
                <View style={styles.card}>
                    <Text style={styles.word}>{item.word}</Text>    
                    {isWordPressed && <Text style={styles.definition}>{item.definition}</Text>}
                </View>    
            </Button>            
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
        backgroundColor: LIGHT_GRAY,
        borderRadius: 20,
        flex: 1
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
        textAlign: 'center'
    }
});

export default WordCard;
