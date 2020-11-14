import React from 'react';
import {
    Alert
} from 'react-native';


const showAlert = (title, message) => {
    Alert.alert(title, message,        
        [
          {
            text: "Fine!",
            onPress: () => {},
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
}

export default {
    showAlert
}