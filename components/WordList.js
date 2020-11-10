import React from 'react';
import {
    FlatList,
    StyleSheet,
    View, 
    Text,
} from 'react-native';
import WordCard from './WordCard';

const WordList = (props) => {
    const {words} = props;

    const emptyListComponent = () => (
        <View style={styles.emptyListComponent}>
            <Text style={{alignItems: 'center', fontSize: 32}}>Add Words!</Text>
        </View>        
    );

    return (
        <FlatList         
            style={styles.list}
            horizontal
            pagingEnabled
            ListEmptyComponent={emptyListComponent()}
            data={words}
            renderItem={({item}) => <WordCard item={item}/>}            
            keyExtractor={item => item.id}>            
        </FlatList>
    );
};

const styles = StyleSheet.create({
    list: {    
    },
    emptyListComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WordList;

