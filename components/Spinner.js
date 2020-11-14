import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

const Spinner = (props) => {
    const {isSpinning} = props;

    return (
        <>
            {isSpinning && 
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
      },
});

export default Spinner;

