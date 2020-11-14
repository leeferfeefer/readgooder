import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';
import Button from './Button';

const LIGHT_GRAY = "#D3D3D3";

const WordCard = (props) => {
    const {item} = props;

    const [isWordPressed, setIsWordPressed] = useState(false);

    const onWordPress = () => {
        setIsWordPressed(!isWordPressed);
    };

    return (
        <View style={styles.itemContainer}>
            <Button onPress={onWordPress} width={'100%'} height={'60%'}>
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
    },
    card: {
        flex: 1,
        margin: 30,
        backgroundColor: LIGHT_GRAY,
        borderRadius: 20
    },
    word: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    definition: {
        fontSize: 18,
        textAlign: 'center'
    }
});

export default WordCard;
