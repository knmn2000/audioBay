import React, {useEffect} from 'react';
import {Button, makeStyles, Text, useTheme} from 'react-native-elements';
import {View} from 'react-native';

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

export default function Home({navigation}) {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.body}>
      <View style={styles.nav}>
        <Text style={{fontSize: theme.test.fontSize}}>hello</Text>
      </View>
      <View style={styles.player}>
        <Button
          title="goto player"
          onPress={() => navigation.navigate('Player')}
        />
      </View>
    </View>
  );
}
