import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import {
  Button,
  ListItem,
  makeStyles,
  Text,
  useTheme,
} from 'react-native-elements';
import {View} from 'react-native';
import track from '../temp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../services/AuthService';

const useStyles = makeStyles((theme, props) => ({
  body: {
    flex: 1,
    backgroundColor: '#F1FDFE',
  },
  nav: {
    height: '28%',
    backgroundColor: '#F1FDFE',
    alignItems: 'center',
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navText: {
    // fontSize: 30,
    // fontWeight: 'bold',
    // textAlign: 'center',
    // marginLeft: 50,
  },
  player: {
    flex: 1,
    backgroundColor: 'white',
  },
}));
/*
TODO:
instead of using async storage for uid
make a component Home, which has child homeComponent.
Wrap authprovider around Home.
*/

export default function Home({navigation}) {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const updateFirestoreTimestamp = useCallback(async () => {
    await AsyncStorage.getItem('current_time').then(async val => {
      await AsyncStorage.getItem('user.uid').then(uid => {
        firestore().collection('user_data').doc(uid).set({
          timestamp: val,
        });
      });
    });
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.nav}>
        <Text style={{fontSize: theme.test.fontSize}}>hello</Text>
      </View>
      <View style={styles.player}>
        {track.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() =>
              navigation.navigate('Player', {
                trackIndex: i,
                updateFirestoreTimestamp,
              })
            }>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
              <ListItem.Subtitle>{l.author}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}
