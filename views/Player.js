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
import secondsToDuration from '../util/secondsToDuration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const useStyles = makeStyles(theme => ({
  body: {
    flex: 1,
    // backgroundColor: theme.colors.whitish,
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

export default function Player(props) {
  const [trackDuration, setDuration] = useState(0);
  const {theme} = useTheme();
  const [currentTime, setCurrentTime] = useState(0);
  const styles = useStyles(theme);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  // const [currentTrack, setCurrentTrack] = useState(
  //   track[props.route.params.trackIndex],
  // );
  const currentTrack = track[props.route.params.trackIndex];
  const handlePlaybutton = async () => {
    setPlaying(!playing);
    playing ? TrackPlayer.pause() : TrackPlayer.play();
    // await AsyncStorage.getItem('user.uid').then(async uid => {
    //   await firestore()
    //     .collection('user_data')
    //     .doc(uid)
    //     .get()
    //     .then(async d => {
    //       // await TrackPlayer.seekTo(parseFloat(d.data().timestamp));
    //       // console.log(parseFloat(d.data().timestamp));
    //       // await TrackPlayer.seekTo(39.61117790076028);
    //       await handleSeek(parseFloat(d.data().timestamp));
    //     });
    // });
  };
  const handleRateChange = async sign => {
    await getRate().then(rate => {
      setRate(rate + sign * 0.25);
    });
  };
  const handleSeek = async seekTime => {
    await TrackPlayer.getDuration().then(async dur => {
      console.log(seekTime * 0.01 * dur);
      await TrackPlayer.seekTo(seekTime * 0.01 * dur);
    });
  };
  // const getCurrentTrack = useCallback(async () => {
  //   const index = await TrackPlayer.getCurrentTrack().then(
  //     currTrack => currTrack,
  //   );
  //   setCurrentTrack(track[index - 1]);
  // }, [setCurrentTrack]);
  const skip = async amount => {
    await TrackPlayer.getPosition().then(async pos => {
      await TrackPlayer.seekTo(pos + amount);
    });
  };

  const getCurrentPos = useCallback(async () => {
    await TrackPlayer.getPosition().then(async pos => {
      await TrackPlayer.getDuration().then(async dur => {
        if ((pos / dur) * 100) {
          setPosition((pos / dur) * 100);
          setCurrentTime(pos);
          await AsyncStorage.setItem(
            'current_time',
            ((pos / dur) * 100).toString(),
          );
          // console.log(secondsToDuration(pos));
        }
      });
    });
  }, []);
  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.add(track);
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        jumpInterval: 10,
      });
    })();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);
  useEffect(() => {
    (async () => {
      await TrackPlayer.getDuration().then(dur => {
        console.log('durr', dur);
        setDuration(secondsToDuration(dur));
      });
    })();
    const interval = setInterval(async () => {
      await getCurrentPos();
    }, 1000);
    return () => {
      clearInterval(interval);
      props.route.params.updateFirestoreTimestamp();
    };
  }, [getCurrentPos, props.route.params]);
  return (
    <View style={styles.body}>
      <View style={styles.emptyBox} />
      <Card containerStyle={styles.player}>
        <Card.Title>{track.title}</Card.Title>
        <Card.Divider />
        <View>
          {/* <CircularSlider value={10} onChange={() => {}} /> */}
          {/* <CircularSliderUniverse
            value={10}
            onChange={() => {}}
            showThumbText
          /> */}
          <Text>{currentTrack ? currentTrack.title : 'null'}</Text>
          <Text>
            {secondsToDuration(currentTime)} / {trackDuration}
          </Text>
          <Slider
            value={position}
            maximumValue={100}
            minimumValue={0}
            onSlidingComplete={handleSeek}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="skip-previous" size={45} onPress={() => skip(-10)} />
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
            <Text h4 h4Style={styles.numberText}>
              +0.25
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => skip(10)}>
            <Icon name="skip-next" size={45} />
          </TouchableOpacity>
        </View>
      </Card>
      <View style={styles.emptyBox} />
    </View>
  );
}
