import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Button from '../../components/Button';
import {SCREEN_NAMES} from '../../navigators/screenNames';
import colors from '../../styles/colors';
import {getLiveMeetings} from '../../api/api';
import {authToken} from '../../api/api';
import {RoomContext} from '../../../App';
export default function LiveStreamHome({navigation}) {
  const {rooms, setRooms} = React.useContext(RoomContext);
  const [blockBtn, setBlockBtn] = useState(false);
  const userName = 'user';
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary['100'],
      }}>
      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          backgroundColor: '#B4D9F3',
        }}>
        <Button
          style={{
            alignItems: 'center',
            backgroundColor: '#006BBB',
            borderRadius: 40,
          }}
          text={'JOINDRE LE STREAMING DIRECT'}
          onPress={async () => {
            try {
              setBlockBtn(true);
              const response = await getLiveMeetings();
              if (response) {
                setRooms(response);
                setBlockBtn(false);
                navigation.navigate(SCREEN_NAMES.Meeting, {
                  userName,
                  authToken,
                  undefined,
                  mode: 'VIEWER',
                  mutliplesMeeting: true,
                  rooms: rooms,
                });
              } else {
                //handel no live streams available
                console.log('no streams available L44/LiveStremHome');
              }
            } catch (error) {}
          }}
          disabled={blockBtn}
        />

        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            marginVertical: 16,
          }}>
          <Text
            style={{
              color: '#202427',
              fontWeight: 'bold',
            }}>
            ──────────
          </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              marginHorizontal: 6,
            }}>
            OU
          </Text>
          <Text
            style={{
              color: '#202427',
              fontWeight: 'bold',
            }}>
            ──────────
          </Text>
        </View>
        <Button
          text={'FAIRE UN STREAMING DIRECT'}
          style={{
            alignItems: 'center',

            borderRadius: 40,
            backgroundColor: '#006BBB',
          }}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.Speaker_Home, {
              isCreator: true,
            });
          }}
        />
        {/*    <Button
          text={'Join as a speaker'}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.Speaker_Home, {
              isCreator: false,
            });
          }}
        />
        <Button
          text={'Join as a viewer'}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.Viewer_Home, {});
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
}
