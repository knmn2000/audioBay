import React from 'react';
import {ThemeProvider, makeStyles} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from './views/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Player from './views/Player';

const Stack = createNativeStackNavigator();
const theme = {
  Button: {
    raised: true,
  },
  colors: {
    whitish: '#e5e5e5',
  },
  test: {
    color: 'green',
    fontSize: 30,
  },
};

const App = props => {
  const styles = useStyles(props);
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.safeAreaView}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Player" component={Player} />
          </Stack.Navigator>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
};
const useStyles = makeStyles(() => ({
  safeAreaView: {
    backgroundColor: theme.colors.whitish,
    flex: 1,
  },
}));
export default App;
