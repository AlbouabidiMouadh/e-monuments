import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import colors from '../../styles/colors';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import ILSContainer from './ILSContainer';
import {SCREEN_NAMES} from '../../navigators/screenNames';
import {RoomContext} from '../../../App';
import {authToken} from '../../api/api';

import {convertRFValue} from '../../styles/spacing';

export default function Meeting({navigation, route}) {
  const token = route.params.token ? route.params.token : authToken;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled
    ? route.params.webcamEnabled
    : false;
  const webcamEnabled = route.params.webcamEnabled
    ? route.params.webcamEnabled
    : false;
  const name = route.params.name ? route.params.name : 'User';
  const mode = route.params.mode ? route.params.mode : 'CONFERENCE';
  const mutliplesMeeting = route.params.mutliplesMeeting ? true : false;

  const {rooms, showListOfStreams} = useContext(RoomContext);

  const [liveRoom, setLiveRoom] = useState('loading');

  const [isJoined, setJoined] = React.useState(false);
  console.log('is joined', isJoined);

  useEffect(() => {}, [isJoined]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.primary[900], padding: 12}}>
      {mutliplesMeeting ? (
        <View>
          {!isJoined && (
            <Text
              style={{
                fontSize: convertRFValue(18),
                color: '#fff',
                fontWeight: 'bold',
                marginTop: 50,
                zIndex: 1,
              }}>
              Loading live streams ...
            </Text>
          )}

          <FlatList
            contentContainerStyle={{backgroundColor: 'red'}}
            scrollEnabled
            data={rooms}
            renderItem={({item}) => {
              if (item.downstreamUrl) {
                console.log(item.downstreamUrl);
                setLiveRoom('exist');
                let HLS_Stoped = false
                return (
                  <MeetingProvider
                    config={{
                      meetingId: item.roomId,
                      micEnabled: false,
                      webcamEnabled: false,
                      name: name, //user name
                      multiStream: false,
                      //These will be the mode of the participant CONFERENCE or VIEWER
                      mode: 'VIEWER',
                    }}
                    token={token}
                    joinWithoutUserInteraction={true}>
                    <MeetingConsumer
                      {...{
                        onMeetingLeft: () => {
                          navigation.navigate('home');
                        },
                        onLiveStreamStopped: () => {
                          console.log('meeting stoped');
                        },
                        onHlsStopped:()=>{
                          console.log('hls stopped');
                          HLS_Stoped=true
                        }
                      }}>
                      {() => {
                        return (
                          <>
                          {
                           HLS_Stoped&&
                           <Text
                           style={{
                             fontSize: convertRFValue(18),
                             color: '#fff',
                             fontWeight: 'bold',
                             marginTop: 50,
                             zIndex: 1,
                           }}>
                           This stream is comming to the end ...
                         </Text>
                          }
                          <ILSContainer
                            webcamEnabled={webcamEnabled}
                            setJoined={setJoined}
                          />
                          </>
                        );
                      }}
                    </MeetingConsumer>
                  </MeetingProvider>
                );
              } else return null;
            }}
          />
        </View>
      ) : (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: micEnabled,
            webcamEnabled: webcamEnabled,
            name,
            mode, // "CONFERENCE" || "VIEWER"
            notification: {
              title: 'Video SDK Meeting',
              message: 'Meeting is running.',
            },
          }}
          token={token}>
          <MeetingConsumer
            {...{
              onMeetingLeft: () => {
                navigation.navigate('home');
                console.warn('error creating meeting please try later !');
                console.log('check app in video sdk ');
              },
            }}>
            {() => {
              return (
                <>
                  {!isJoined && (
                    <Text
                      style={{
                        fontSize: convertRFValue(18),
                        color: '#fff',
                        fontWeight: 'bold',
                        marginTop: 50,
                        zIndex: 1,
                      }}>
                      Loading ...
                    </Text>
                  )}
                  <ILSContainer
                    webcamEnabled={webcamEnabled}
                    setJoined={setJoined}
                  />
                </>
              );
            }}
          </MeetingConsumer>
        </MeetingProvider>
      )}
    </SafeAreaView>
  );
}


