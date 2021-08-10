import React from 'react';
import {AuthService} from './services/AuthService';
import Navigation from './Navigation';

const App = () => {
  return (
    <AuthService>
      <Navigation />
    </AuthService>
  );
};
export default App;
