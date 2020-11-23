import React, {useState, useEffect, useRef} from 'react';
import {
    FlatList,
    StyleSheet,
    View, 
    Text,
} from 'react-native';
import WordCard from './WordCard';
import Button from './Button';
import Slider from '@react-native-community/slider';

const WordList = (props) => {
    const flatListRef = useRef(null);
    const {words, setDeleteWordConfirmSheetVisibility} = props;
    const [index, setIndex] = useState(words.length);

    useEffect(() => {
        setIndex(words.length);
    }, [words]);


    const emptyListComponent = () => (
        <View style={styles.emptyListComponent}>
            <Text style={{textAlign: 'center', fontSize: 32}}>Add Words!</Text>
        </View>        
    );

    const toTopButtonPressed = () => {
        words.length > 1 && flatListRef.current.scrollToIndex({animated: true, index: 0});
    }

    const handleSliderValueChange = (index) => {    
        let newScrollIndex = Math.abs(Math.round((index-(words.length-1))*-1));
        setIndex(newScrollIndex);
        flatListRef.current.scrollToIndex({index: newScrollIndex});
    }

    return (
        <View style={styles.listContainer}>
            <FlatList     
                ref={flatListRef}
                onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
                contentContainerStyle={{ flexGrow: 1 }} 
                style={styles.list}
                horizontal
                pagingEnabled
                ListEmptyComponent={emptyListComponent()}
                data={words}
                renderItem={({item, index}) => <WordCard item={item} setDeleteWordConfirmSheetVisibility={setDeleteWordConfirmSheetVisibility}/>}            
                keyExtractor={item => `${item.id}`}>            
            </FlatList>
            <Text>{index+1} / {words.length}</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={(words.length-1)}
                minimumTrackTintColor="#434343"
                maximumTrackTintColor="#434343"
                thumbTintColor="#434343"
                inverted
                onValueChange={handleSliderValueChange}
            />
            {/* <Button
                imageSource={require('../assets/left.png')} 
                onPress={toTopButtonPressed}
                height={30}
                width={30}
                isDisabled={words.length < 2}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {    
        flex: 1
    },
    emptyListComponent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WordList;

