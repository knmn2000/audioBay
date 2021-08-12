import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ThemeProvider, makeStyles} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from './views/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Player from './views/Player';
import {AuthContext} from './services/AuthService';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const Navigation = props => {
  const styles = useStyles(props);
  const [initializing, setIntializing] = useState(true);
  const {signIn, signOut, user, setUser} = useContext(AuthContext);
  const onAuthStateChanged = useCallback(
    new_user => {
      setUser(new_user);
      if (initializing) {
        setIntializing(false);
      }
    },
    [initializing, setUser],
  );
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    if (user) {
      (async () => await AsyncStorage.setItem('user.uid', user.uid))();
    }
    return subscriber;
  }, [onAuthStateChanged, user]);
  const options = {
    headerRight: () =>
      user ? (
        <Icon name="meeting-room" size={35} onPress={signOut} />
      ) : (
        <Icon name="exit-to-app" size={35} onPress={signIn} />
      ),
  };

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.safeAreaView}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={options} />
            <Stack.Screen name="Player" component={Player} options={options} />
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
export default Navigation;
