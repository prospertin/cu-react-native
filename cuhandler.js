import React from 'react';
import { Text, Image, View, StyleSheet, WebView, Alert } from 'react-native';

class CUHandler extends React.Component {
    static navigationOptions = {
        title: 'CU Handler'
    };

    render() {
        const {url} = this.props.navigation.state.params;
        return (
            <WebView
            source={{uri: url}}
            style={{marginTop: 20}} />
        )
    }
}

export default CUHandler;