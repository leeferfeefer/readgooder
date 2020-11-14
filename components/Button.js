import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

const Button = (props) => {
    const {onPress, imageSource, children, width, height, onLongPress, isDisabled} = props;
    return (
        <TouchableOpacity 
            style={{width, height}} 
            onPress={onPress} 
            onLongPress={onLongPress} 
            isDisabled={isDisabled}>
                {imageSource && 
                    <Image
                        source={imageSource}
                        style={{width, height}}
                    />
                }
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

});

export default Button;

