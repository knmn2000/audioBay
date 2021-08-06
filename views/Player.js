import React, {useEffect, useState, useCallback} from 'react';
import {
  Button,
  makeStyles,
  Text,
  useTheme,
  Card,
  Tile,
  Slider,
} from 'react-native-elements';
import {TouchableOpacity, View} from 'react-native';
import TrackPlayer, {getRate, setRate} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CircularSlider as CircularSliderUniverse} from 'react-native-elements-universe';
import track from '../temp';
TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    TrackPlayer.CAPABILITY_JUMP_FORWARD,
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
  jumpInterval: 10,
});

const useStyles = makeStyles(theme => ({
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

export default function Player({trackIndex}) {
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
  const styles = useStyles(theme);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(track[trackIndex]);
  useEffect(() => {
    if (currentTrack) {
      getCurrentTrack();
    }
  }, [currentTrack, getCurrentTrack]);
  const handlePlaybutton = () => {
    setPlaying(!playing);
    return playing ? TrackPlayer.pause() : TrackPlayer.play();
  };
  const handleRateChange = async sign => {
    await getRate().then(rate => {
      setRate(rate + sign * 0.25);
    });
  };
  const handleTrackChange = useCallback(
    async direction => {
      if (direction === 'next') {
        await TrackPlayer.skipToNext().then(() => getCurrentTrack());
      } else {
        await TrackPlayer.skipToPrevious().then(() => getCurrentTrack());
      }
    },
    [getCurrentTrack],
  );
  const getCurrentTrack = useCallback(async () => {
    const index = await TrackPlayer.getCurrentTrack().then(
      currTrack => currTrack,
    );
    setCurrentTrack(track[index - 1]);
  }, [setCurrentTrack]);
  return (
    <View style={styles.body}>
      <View style={styles.emptyBox} />
      <Card containerStyle={styles.player}>
        <Card.Title>{track.title}</Card.Title>
        <Card.Divider />
        <View style={styles.playbackPic}>
          {/* <CircularSlider value={10} onChange={() => {}} /> */}
          {/* <CircularSliderUniverse
            value={10}
            onChange={() => {}}
            showThumbText
          /> */}
          <Text>{currentTrack ? currentTrack.title : 'null'}</Text>
          <Slider
            value={10}
            onValueChange={() => console.log(currentTrack)}
            maximumValue={100}
            minimumValue={0}
            // thumbProps={{}}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="skip-previous"
              size={45}
              onPress={() => handleTrackChange('prev')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => handleRateChange(-1)}>
            <Text h4 h4Style={styles.numberText}>
              +0.25
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePlaybutton}>
            <Icon name={playing ? 'pause' : 'play-arrow'} size={45} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => handleRateChange(1)}>
            {/* <Text style={{fontSize: 15}}>+0.25</Text> */}
            <Text h4 h4Style={styles.numberText}>
              +0.25
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTrackChange('next')}>
            <Icon name="skip-next" size={45} />
          </TouchableOpacity>
        </View>
      </Card>
      <View style={styles.emptyBox} />
    </View>
  );
}
