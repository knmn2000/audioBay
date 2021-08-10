import React, {useContext, useEffect, useState} from 'react';
import {ThemeProvider, makeStyles, Text} from 'react-native-elements';
import {
  initialWindowMetrics,
  SafeAreaView,
} from 'react-native-safe-area-context';
import Home from './views/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Player from './views/Player';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {AuthContext, AuthService} from './services/AuthService';
import auth from '@react-native-firebase/auth';

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
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setIntializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(user);
    return subscriber;
  }, [onAuthStateChanged, user]);
  const options = {
    headerRight: () => (
      <Icon name="exit-to-app" size={35} onPress={signIn} />
      // <Icon
      //   name="meeting-room"
      //   size={35
      //   onPress={() => console.log('heell')}
      // />
    ),
  };
  return (
    <AuthService>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={styles.safeAreaView}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} options={options} />
              <Stack.Screen
                name="Player"
                component={Player}
                options={options}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </ThemeProvider>
      </NavigationContainer>
    </AuthService>
  );
};
const useStyles = makeStyles(() => ({
  safeAreaView: {
    backgroundColor: theme.colors.whitish,
    flex: 1,
  },
}));
export default Navigation;
