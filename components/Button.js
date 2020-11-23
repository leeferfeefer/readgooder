import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

const Button = (props) => {
    const {onPress, imageSource, children, width, height, onLongPress, isDisabled, style} = props;
    return (
        <TouchableOpacity 
            style={{width, height, ...style}} 
            onPress={onPress} 
            onLongPress={onLongPress} 
            disabled={isDisabled}>
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

const styles = StyleSheet.create({});

export default Button;

