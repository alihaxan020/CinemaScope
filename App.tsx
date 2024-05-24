import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

const App = () => {
  return <AppNavigation />;
};

export default App;
