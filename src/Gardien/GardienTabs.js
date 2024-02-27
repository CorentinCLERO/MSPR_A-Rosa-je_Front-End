import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import Map from '../Map/Map';
import Missions from '../Missions/Missions';
import PlantSOS from '../PlantSOS/PlantSOS';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GardienTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={Map}
          options={{ tabBarLabel: 'Map', tabBarIcon: () => { return <Icon name="home-map-marker" size={24} />; }, }}
        />
        <Tab.Screen
          name="Missions"
          component={Missions}
          options={{ tabBarLabel: 'Missions', tabBarIcon: () => { return <Icon name="calendar-month" size={24} />; }, }}
        />
        <Tab.Screen
          name="PlantSOS"
          component={PlantSOS}
          options={{ tabBarLabel: 'PlantSOS', tabBarIcon: () => { return <Icon name="leaf" size={24} />; }, }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default GardienTabs;