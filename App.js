import React from 'react';
import {AuthService} from './services/AuthService';
import Navigation from './Navigation';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <AuthService>
      <Navigation />
    </AuthService>
  );
};
export default App;
