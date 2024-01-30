import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import PlantSOS from '../PlantSOS/PlantSOS';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BotanisteTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="PlantSOS"
          component={PlantSOS}
          options={{ tabBarLabel: 'PlantSOS', tabBarIcon: () => { return <Icon name="help-box" size={24} />; }, }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BotanisteTabs;