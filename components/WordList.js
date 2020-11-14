import React from 'react';
import {
    FlatList,
    StyleSheet,
    View, 
    Text,
} from 'react-native';
import WordCard from './WordCard';
import Button from './Button';

const WordList = (props) => {
    const {words} = props;

    const emptyListComponent = () => (
        <View style={styles.emptyListComponent}>
            <Text style={{textAlign: 'center', fontSize: 32}}>Add Words!</Text>
        </View>        
    );

    const toTopButtonPressed = () => {
        this.flatList.scrollToIndex({
            animated: true,
            index: 0
        });
    }

    return (
        <>
            <FlatList     
                ref={ref => {this.flatList = ref}}
                onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                contentContainerStyle={{ flexGrow: 1 }} 
                style={styles.list}
                horizontal
                pagingEnabled
                ListEmptyComponent={emptyListComponent()}
                data={words}
                renderItem={({item}) => <WordCard item={item}/>}            
                keyExtractor={item => `${item.id}`}>            
            </FlatList>
            <Button
                imageSource={require('../assets/left.png')} 
                onPress={toTopButtonPressed}
                height={30}
                width={30}
                isDisabled={words.length === 0}
            />
        </>
    );
};

const styles = StyleSheet.create({
    list: {    
    },
    emptyListComponent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WordList;

