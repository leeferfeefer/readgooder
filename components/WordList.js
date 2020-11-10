import React, {useState, useEffect} from 'react';
import {
    FlatList,
    StyleSheet,
    View, 
    Text,
    Dimensions
} from 'react-native';
import Button from './Button';

const WordList = (props) => {
    const [isWordPressed, setIsWordPressed] = useState(false);
    const {words} = props;

    const onWordPress = () => {
        setIsWordPressed(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Button onPress={onWordPress} width={'100%'} height={'100%'}>
                <View style={styles.card}>
                    <Text style={styles.word}>{item.word}</Text>
                </View>    
            </Button>            
        </View>
    );

    const emptyListComponent = () => (
        <View style={styles.emptyListComponent}>
            <Text style={styles.title}>Add Words!</Text>
        </View>        
    );

    return (
        <FlatList         
            style={styles.list}
            horizontal
            pagingEnabled
            ListEmptyComponent={emptyListComponent()}
            data={words}
            renderItem={renderItem}            
            keyExtractor={item => item.id}>            
        </FlatList>
    );
};

const styles = StyleSheet.create({
    list: {    
        backgroundColor: 'blue',    
    },
    itemContainer: {
        backgroundColor: '#f9c2ff',
        width: Dimensions.get('screen').width
    },
    card: {
        margin: 30
    }
    word: {
        fontSize: 32,
        textAlign: 'center'
    },
    emptyListComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    }
});

export default WordList;

