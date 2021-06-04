import React from 'react';
import {
    Alert
} from 'react-native';


const showAlert = (title, message, callback) => {
    Alert.alert(title, message,        
        [!!callback && {
          text: "Yes",
          onPress: callback,
        },
          {
            text: !!callback ? "No" : "Fine!",
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