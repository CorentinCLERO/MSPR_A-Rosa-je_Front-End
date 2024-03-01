import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import PlantSOS from '../PlantSOS/PlantSOS';
import PlantSOSSVG from '../../assets/iconesTabs/plantSOS.svg';

const BotanisteTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="PlantSOS"
          component={PlantSOS}
          options={{
            tabBarIcon: ({ color }) => (
              <PlantSOSSVG fill={color} width="24" height="24" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BotanisteTabs;