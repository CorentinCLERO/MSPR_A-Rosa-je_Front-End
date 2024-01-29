import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import ClientTabs from './Client/ClientTabs';
import GardienTabs from './Gardien/GardienTabs';
import BotanisteTabs from './Botaniste/BotanisteTabs';

const Tabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Client" component={ClientTabs} />
        <Tab.Screen name="Gardien" component={GardienTabs} />
        <Tab.Screen name="Botaniste" component={BotanisteTabs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;