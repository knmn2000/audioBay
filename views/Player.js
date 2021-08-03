import React, {useEffect, useState} from 'react';
import {
  Button,
  makeStyles,
  Text,
  useTheme,
  Card,
  Tile,
} from 'react-native-elements';
import {TouchableOpacity, View} from 'react-native';
import TrackPlayer, {getRate, setRate} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
  jumpInterval: 10,
});

const useStyles = makeStyles((theme, props) => ({
  body: {
    flex: 1,
    backgroundColor: theme.colors.whitish,
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
    flex: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    shadowRadius: 5,
    marginVertical: 0,
    marginHorizontal: '4%',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 20,
    margin: 10,
  },
  textButton: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 20,
    margin: 10,
    padding: 12,
  },
  numberText: {
    fontSize: 18,
  },
  playbackInfo: {
    textAlign: 'center',
  },
  emptyBox: {
    flex: 1,
  },
}));

const track = [
  {
    id: '1',
    // url: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
    url: 'https://firebasestorage.googleapis.com/v0/b/audiobay.appspot.com/o/deepwork.m4a?alt=media&token=eb99cd46-578d-4b3f-96d9-8ac1b9b5c46a',
    title: 'deepwork',
    artist: 'cal newport',
  },
  {
    id: '2',
    url: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
    title: 'shakespear play',
    artist: 'shanky',
  },
];

export default function Player(props) {
  console.log(props.navigation);
  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer({}).then(() => {
        console.log('player is setup');
      });

      //   TrackPlayer.registerPlaybackService(() => TrackPlayerServices);

      await TrackPlayer.add(track);

      setTimeout(() => {
        TrackPlayer.stop();
      }, 2000);
    })();
  }, []);

  const {theme} = useTheme();
  const styles = useStyles(theme, props);
  const [playing, setPlaying] = useState(false);
  const handlePlaybutton = () => {
    setPlaying(!playing);
    return playing ? TrackPlayer.pause() : TrackPlayer.play();
  };
  const handleRateChange = async sign => {
    await getRate().then(rate => {
      setRate(rate + sign * 0.25);
    });
  };
  return (
    <View style={styles.body}>
      <View style={styles.emptyBox} />
      <Card containerStyle={styles.player}>
        <Card.Title>{track.title}</Card.Title>
        <Card.Divider />
        <View style={styles.playbackPic}>
          <Tile
            imageSrc={{
              uri: 'https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
            }}
            containerStyle={{
              width: '100%',
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="skip-previous"
              size={45}
              onPress={() => TrackPlayer.pause()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => handleRateChange(1)}>
            <Text h4 h4Style={styles.numberText}>
              +0.25
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePlaybutton}>
            <Icon name={playing ? 'pause' : 'play-arrow'} size={45} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => TrackPlayer.skipToNext()}>
            {/* <Text style={{fontSize: 15}}>+0.25</Text> */}
            <Text h4 h4Style={styles.numberText}>
              +0.25
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRateChange(-1)}>
            <Icon name="skip-next" size={45} />
          </TouchableOpacity>
        </View>
      </Card>
      <View style={styles.emptyBox} />
      {/* <View style={styles.player}>
        <View>
          <Text style={styles.playbackInfo}>{track.title}</Text>
          <Text style={styles.playbackInfo}>{track.artist}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="skip-previous"
              size={45}
              onPress={() => TrackPlayer.pause()}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePlaybutton}>
            <Icon name={playing ? 'pause' : 'play-arrow'} size={45} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => TrackPlayer.play()}>
            <Icon name="skip-next" size={45} />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}
