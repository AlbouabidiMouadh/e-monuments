import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Home from './Home';
import Guides from './Guides';
import Profil22 from './Profil';
import Map from './map';
import UserMap from '../components/UserLocation/UserLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
/* import LiveStreamV2 from './LiveStream';
import LiveStreaming from './LiveStreaming'; */
import LiveStreamHome from './home/index';

// import LiveStreamV2 from './LiveStreamV2';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const getUserId = async () => {
    const user = await AsyncStorage.getItem('user');
    console.log('user = ', user);
    setUserID(user);
  };
  const [userID, setUserID] = useState(null);
  getUserId();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {height: 60},
        tabBarStyle: {height: 60, paddingBottom: 3},
      }}>
      {typeof userID == 'string' ? (
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Guides"
        component={Guides}
        options={{
          tabBarLabel: 'Guides',
          tabBarIcon: ({color, size}) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Map"
        component={UserMap}
        options={{
          headerShown: false,
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <Icon name="location-outline" color={color} size={size} />
          ),
        }}
      /> */}
      {typeof userID == 'string' ? (
        <Tab.Group>
          <Tab.Screen
            name="Map"
            component={UserMap}
            options={{
              headerShown: false,
              tabBarLabel: 'Map',
              tabBarIcon: ({color, size}) => (
                <Icon name="location-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="liveStream"
            component={LiveStreamHome}
            options={{
              headerShown: false,
              tabBarLabel: 'Streaming',
              tabBarIcon: ({color, size}) => (
                <Icon name="ios-add-circle-outline" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Profil"
            component={Profil22}
            options={{
              tabBarLabel: 'Profil',
              tabBarIcon: ({color, size}) => (
                <Icon name="person-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Group>
      ) : null}
    </Tab.Navigator>
  );
};

export default Tabs;
