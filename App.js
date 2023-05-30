import React, {createContext, useState} from 'react';
import colors from './src/styles/colors';
import Home from './src/scenes/home/index';
import Viewer_Home from './src/scenes/home/viewer';
import Speaker_Home from './src/scenes/home/speaker';
import Meeting from './src/scenes/ILS';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAMES} from './src/navigators/screenNames';
import Splash from './src/scenes/Splash';
import Signup from './src/scenes/Signup';
import Login from './src/scenes/Login';
import Tabs from './src/scenes/Tabs';
import EditProfile from './src/scenes/EditProfile';
import Post from './src/scenes/Post';
import CreatePost from './src/scenes/Plus';
import OneStreamScreen from './src/scenes/ILS/Viewer/OneStreamScreen';
import Mdpoublier from './src/scenes/Mdpoublier';

const RootStack = createStackNavigator();

export const RoomContext = createContext({
  rooms: [],
  setRooms: val => {},
  multipleMeetings: false,
  setMultipleMeetings: val => {},
  showListOfStreams : false,
  setSHowListOfStreams:val => {},
  localParticipantMode:undefined,
  setLocalParticipantMode:val => {},
  localParticipantId:undefined,
  setLocalParticipantId:val => {},

});

export default function App({}) {
  const [allRooms, setAllRooms] = useState([]);
  const [multipleMeetings, setMultipleMeetings] = useState(false);
  const [showListOfStreams, setSHowListOfStreams] = useState(false);
  const [localParticipantMode, setLocalParticipantMode] = useState(undefined);
  const [localParticipantId, setLocalParticipantId] = useState(undefined);


  const setRooms = val => {
    setAllRooms(val);
  };

  /* console.log('ctx rooms val',allRooms) */

  return (
    <NavigationContainer>
      <RoomContext.Provider
        value={{
          rooms: allRooms,
          setRooms,
          multipleMeetings,
          setMultipleMeetings,
          showListOfStreams,
          setSHowListOfStreams,
          localParticipantMode,
          setLocalParticipantMode,
          localParticipantId,
          setLocalParticipantId,
          
        }}>
        <RootStack.Navigator
          screenOptions={{
            animationEnabled: false,
            presentation: 'modal',
          }}
          initialRouteName={SCREEN_NAMES.Spalsh}>
          <RootStack.Screen
            name={SCREEN_NAMES.Spalsh}
            component={Splash}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={SCREEN_NAMES.Signup}
            component={Signup}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={SCREEN_NAMES.Login}
            component={Login}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={SCREEN_NAMES.MdpOublier}
            component={Mdpoublier}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={SCREEN_NAMES.Tabs}
            component={Tabs}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={SCREEN_NAMES.EditProfile}
            component={EditProfile}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={SCREEN_NAMES.Post}
            component={Post}
            options={{headerShown: false}}
          />
             <RootStack.Screen
            name={SCREEN_NAMES.CreatePost}
            component={CreatePost}
            options={{headerShown: false}}
          />


          <RootStack.Screen
            name={SCREEN_NAMES.Viewer_Home}
            component={Viewer_Home}
            options={{
              headerStyle: {
                backgroundColor: colors.primary['900'],
              },
              headerBackTitle: 'Home',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <RootStack.Screen
            name={SCREEN_NAMES.Speaker_Home}
            component={Speaker_Home}
            options={{
              
              headerStyle: {
                backgroundColor: colors.primary['900'],
                
              },
              headerBackTitle: 'Home',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          {/*  */}
          <RootStack.Screen
            name={SCREEN_NAMES.Meeting}
            component={Meeting}
            options={{headerShown: false}}
          /><RootStack.Screen
          name={SCREEN_NAMES.OneStream}
          component={OneStreamScreen}
          options={{headerShown: false,
          }}
        />
        </RootStack.Navigator>
      </RoomContext.Provider>
    </NavigationContainer>
  );
}
