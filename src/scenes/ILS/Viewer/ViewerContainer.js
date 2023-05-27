import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import ChatViewer from '../Components/ChatViewer';
import {Cancel, HourGlass, Stop} from '../../../assets/icons';
import {useOrientation} from '../../../utils/useOrientation';
import colors from '../../../styles/colors';
import {convertRFValue} from '../../../styles/spacing';
import {usePubSub, useMeeting} from '@videosdk.live/react-native-sdk';
import ControlsOverlay from './ControlsOverlay';
import {useNavigation} from '@react-navigation/native';
import {getLiveMeetings} from '../../../api/api';
import {RoomContext} from '../../../../App';
import {SCREEN_NAMES} from '../../../navigators/screenNames';
export default function ViewerContainer({
  localParticipantId,
  setlocalParticipantMode,
}) {
  const {setSHowListOfStreams,multipleMeetings} = useContext(RoomContext);
  const navigation = useNavigation();
  const {changeMode, leave, hlsState, hlsUrls} = useMeeting();
  const deviceOrientation = useOrientation();
  const [progress, setProgrss] = useState(0);
  const [playableDuration, setplayableDuration] = useState(0);
  const [showControl, setSHowControl] = useState(false);

  const [isChatVisible, setisChatVisible] = useState(false);
  const [pause, setPause] = useState(false);

  const videoPlayer = useRef(null);

  const seekTo = sec => {
    videoPlayer &&
      videoPlayer.current &&
      typeof videoPlayer.current.seek === 'function' &&
      videoPlayer.current.seek(sec);
  };

  usePubSub(`CHANGE_MODE_${localParticipantId}`, {
    onMessageReceived: data => {
      const {message, senderName} = data;
      if (message.mode === 'CONFERENCE') {
        showAlert(senderName);
      }
    },
  });

  const showAlert = senderName => {
    Alert.alert(
      'Permission',
      `${senderName} has requested you to join as a speaker`,
      [
        {
          text: 'Reject',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            changeMode('CONFERENCE');
            setlocalParticipantMode('CONFERENCE');
          },
        },
      ],
    );
  };

  useEffect(() => {
    if (hlsState == 'HLS_PLAYABLE') {
      setSHowListOfStreams(true);
    }
  }, [hlsState]);

  const LandscapeView = () => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          height: Dimensions.get('window').height - 40,
          backgroundColor: '#2B3034',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Video
            ref={videoPlayer}
            source={{
              uri: hlsUrls.downstreamUrl,
            }} // Can be a URL or a local file.
            style={{
              flex: 1,
              backgroundColor: 'black',
            }}
            onError={e => console.log('error', e)}
            paused={pause}
            onProgress={({currentTime, playableDuration}) => {
              setProgrss(currentTime);
              setplayableDuration(playableDuration);
            }}
            onLoad={data => {
              const {duration} = data;
              setplayableDuration(duration);
            }}
          />
          {/* stream control */}
          {/*    <ControlsOverlay
            playableDuration={playableDuration}
            setPause={setPause}
            pause={pause}
            progress={progress}
            seekTo={sec => {
              seekTo(sec);
            }}
            isChatVisible={isChatVisible}
            setisChatVisible={setisChatVisible}
          /> */}
        </View>
        {/*     {isChatVisible ? (
          <View style={{flex: 0.8}}>
            <ChatViewer raiseHandVisible={false} />
          </View>
        ) : null} */}
      </SafeAreaView>
    );
  };

  const PortraitView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSHowControl(currentState => !currentState);
          /*   navigation.navigate(SCREEN_NAMES.OneStream,{
        localParticipantId,
        setlocalParticipantMode,
      }) */
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2B3034',
            height: Dimensions.get('window').height - 30,
          }}>
          <View
            style={{
              flex: showControl ? 1 : 5,
            }}>
            <Video
              ref={videoPlayer}
              resizeMode={'cover'}
              source={{
                uri: hlsUrls.downstreamUrl,
              }} // Can be a URL or a local file.
              style={{
                flex: 1,
                backgroundColor: 'black',
              }}
              // controls
              onError={e => console.log('error', e)}
              paused={pause}
              onProgress={({currentTime, playableDuration}) => {
                setProgrss(currentTime);
                setplayableDuration(playableDuration);
              }}
              onLoad={data => {
                const {duration} = data;
                setplayableDuration(duration);
              }}
            />
            {   showControl&&  <ControlsOverlay
            playableDuration={playableDuration}
            setPause={setPause}
            pause={pause}
            progress={progress}
            seekTo={sec => {
              seekTo(sec);
            }}
            isChatVisible={isChatVisible}
            setisChatVisible={setisChatVisible}
          />} 
          </View>
                {   showControl&&  <View
          style={{
            flex: 0.2,
            backgroundColor: '#2B3034',
          }}>
          <ChatViewer raiseHandVisible={true} />
        </View>
  } 
        </SafeAreaView>
      </TouchableOpacity>
    );
  };

  /*  const WaitingScreen = () => {
    return (
      <SafeAreaView
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: colors.primary[900],
        }}>
        <HourGlass />
        <Text
          style={{
            fontSize: convertRFValue(18),
            color: colors.primary[100],
            fontWeight: 'bold',
            marginTop: 12,
          }}>
          Waiting for speaker
        </Text>
        <Text
          style={{
            fontSize: convertRFValue(18),
            color: colors.primary[100],
            fontWeight: 'bold',
          }}>
          to start the live streaming
        </Text>
        <TouchableOpacity
          onPress={() => {
            leave();
            navigation.goBack();
          }}
          style={{
            height: 30,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
            position: 'absolute',
            top: 12,
            left: 12,
          }}>
          <Cancel />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }; */

  const StopLiveStreamScreen = () => {
    return (
      <SafeAreaView
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: colors.primary[900],
        }}>
        <Stop />
        <Text
          style={{
            fontSize: convertRFValue(18),
            color: colors.primary[100],
            fontWeight: 'bold',
            marginTop: 12,
          }}>
          Host has stopped
        </Text>
        <Text
          style={{
            fontSize: convertRFValue(18),
            color: colors.primary[100],
            fontWeight: 'bold',
          }}>
          the live streaming
        </Text>
        <TouchableOpacity
          onPress={() => {
            leave();
            navigation.goBack();
          }}
          style={{
            height: 30,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
            position: 'absolute',
            top: 12,
            left: 12,
          }}>
          <Cancel />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
      keyboardVerticalOffset={-1}
      style={{
        flex: 1,
        backgroundColor: '#2B3034',
        flexDirection: deviceOrientation === 'PORTRAIT' ? 'column' : 'row',
      }}>
      {
        hlsState == 'HLS_PLAYABLE' || hlsState == 'HLS_STARTED'
          ? deviceOrientation === 'PORTRAIT'
            ? PortraitView()
            : LandscapeView()
          :  <Text
          style={{
            fontSize: convertRFValue(18),
            color: '#fff',
            fontWeight: 'bold',
            marginTop: 50,
            zIndex: 1,
          }}>
         no current live stream in this room !
        </Text>
      }
    </KeyboardAvoidingView>
  );
}

export const WaitingScreen = props => {
  const {navigation} = props;
  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.primary[900],
      }}>
      <HourGlass />
      <Text
        style={{
          fontSize: convertRFValue(18),
          color: colors.primary[100],
          fontWeight: 'bold',
          marginTop: 12,
        }}>
        Waiting for speaker
      </Text>
      <Text
        style={{
          fontSize: convertRFValue(18),
          color: colors.primary[100],
          fontWeight: 'bold',
        }}>
        to start the live streaming
      </Text>
      <TouchableOpacity
        onPress={() => {
          leave();
          navigation.goBack();
        }}
        style={{
          height: 30,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 4,
          position: 'absolute',
          top: 12,
          left: 12,
        }}>
        <Cancel />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
