import React, {useEffect} from 'react';
import {Button, makeStyles, Text, useTheme} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerServices from '../services/TrackPlayerServices';

const useStyles = makeStyles((theme, props) => ({
  body: {
    flex: 1,
  },
  nav: {
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
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
    backgroundColor: 'green',
  },
}));

const track = {
  id: '1',
  url: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
  title: '141: Jason Fried - Running the Tailwind Business on Basecamp',
  artist: 'Full Stack Radio',
};
TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

export default function Home(props) {
  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('player is setup');
      });

      //   TrackPlayer.registerPlaybackService(() => TrackPlayerServices);

      await TrackPlayer.add([track]);

      await TrackPlayer.play();
      console.log('playyy');

      setTimeout(() => {
        TrackPlayer.stop();
      }, 2000);
    })();
  }, []);

  const {theme} = useTheme();
  const styles = useStyles(theme, props);
  return (
    <View style={styles.body}>
      <View style={styles.nav}>
        <Text style={{fontSize: theme.test.fontSize}}>hello</Text>
      </View>
      <View style={styles.player}>
        <Button title="play" onPress={async () => await TrackPlayer.play()} />
        <Button title="stop" onPress={async () => await TrackPlayer.stop()} />
      </View>
    </View>
  );
}
