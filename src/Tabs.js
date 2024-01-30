import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import ProprietaireTabs from './Proprietaire/ProprietaireTabs';
import GardienTabs from './Gardien/GardienTabs';
import BotanisteTabs from './Botaniste/BotanisteTabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Proprietaire" component={ProprietaireTabs} />
        <Tab.Screen name="Gardien" component={GardienTabs} />
        <Tab.Screen name="Botaniste" component={BotanisteTabs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;