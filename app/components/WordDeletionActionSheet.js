import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import Button from "./Button";

const WordDeletionActionSheet = (props) => {
    const {actionSheetRef, onButtonPress} = props;
    return (
        <ActionSheet ref={actionSheetRef}>
            <View style={styles.container}>
                <Text>Delete this word?</Text>
                <Button
                    imageSource={require('../../assets/delete.png')} 
                    onPress={onButtonPress}
                    height={60}
                    width={60}
                />
            </View>
        </ActionSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: 30
    }
});

export default WordDeletionActionSheet;