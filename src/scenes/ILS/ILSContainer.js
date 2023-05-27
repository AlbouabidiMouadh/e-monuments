import {
  useMeeting,
  ReactNativeForegroundService,
} from '@videosdk.live/react-native-sdk';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MeetingViewer from './Speaker/MeetingViewer';
import WaitingToJoinView from './Components/WaitingToJoinView';
import { Text } from 'react-native';
import ViewerContainer from './Viewer/ViewerContainer';
import Orientation from 'react-native-orientation-locker';
import { RoomContext } from '../../../App';
import { convertRFValue } from '../../styles/spacing';


export default function ILSContainer(props) {

  const {localParticipantMode, setLocalParticipantMode,localParticipantId,setLocalParticipantId} = useContext(RoomContext);
  const [isJoined, setJoined] = React.useState(false);

  const mMeeting = useMeeting({});


  const mMeetingRef = useRef();

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const {join, changeWebcam, leave, participants, localParticipant,webcamOn ,webcamStream} =
    useMeeting({
      onParticipantModeChanged: ({mode, participantId}) => {
        const localParticipant = mMeetingRef.current?.localParticipant;
        if (participantId === localParticipant.id) {
          if (mode === 'CONFERENCE') {
            Orientation.lockToPortrait();
            Orientation.unlockAllOrientations();
            localParticipant.pin();
          } else {
            localParticipant.unpin();
          }
        }
      },
      onMeetingJoined: () => {
        const localParticipant = mMeetingRef.current?.localParticipant;
        const meetingMode = localParticipant.mode;
        if (meetingMode === 'CONFERENCE') {
          localParticipant.pin();
        }
        setTimeout(() => {
          setJoined(true);
          props.setJoined(true)
          
        }, 100);
      },
    });

  useEffect(() => {
    const mode = localParticipant
      ? participants.get(localParticipant.id).mode
      : null;
    setLocalParticipantMode(mode);
    setLocalParticipantId(localParticipant?.id)
  }, [localParticipant]);

  useEffect(() => {
    const timer=setTimeout(() => {
      if (!isJoined) {
        join();
        if (props.webcamEnabled) changeWebcam();
      }
    }, 1000);

    return () => {
      clearTimeout(timer)
      Orientation.lockToPortrait();
      Orientation.unlockAllOrientations();
      leave();
      ReactNativeForegroundService.stopAll();
    };
  }, []);



//update is joined



  
  return isJoined ? (
    localParticipantMode === 'CONFERENCE' ? (
      <MeetingViewer setlocalParticipantMode={setLocalParticipantMode} />
    ) : (
      <ViewerContainer
        localParticipantId={localParticipantId}
        setlocalParticipantMode={setLocalParticipantMode}
      />
    )
  ) : null
}
