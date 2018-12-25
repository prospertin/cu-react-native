import React from 'react';

import { AppRegistry, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './home';
import CUHandler from './cuhandler';

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    CUHandler: { screen: CUHandler },
});

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer;