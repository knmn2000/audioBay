import React from 'react';
import {ThemeProvider, makeStyles} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from './views/Home';
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
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaView}>
        <Home />
      </SafeAreaView>
    </ThemeProvider>
  );
};
const useStyles = makeStyles(() => ({
  safeAreaView: {
    backgroundColor: theme.colors.whitish,
    flex: 1,
  },
}));
export default App;
