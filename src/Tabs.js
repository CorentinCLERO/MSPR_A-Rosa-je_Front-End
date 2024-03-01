import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import ProprietaireTabs from './Proprietaire/ProprietaireTabs';
import GardienTabs from './Gardien/GardienTabs';
import BotanisteTabs from './Botaniste/BotanisteTabs';
import ProprietaireSVG from '../assets/iconesTabs/proprietaire.svg';
import GardienSVG from '../assets/iconesTabs/gardien.svg';
import BotannisteSVG from '../assets/iconesTabs/botaniste.svg';

const Tabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: '#888888' }}
      >
        <Tab.Screen
          name="Proprietaire"
          component={ProprietaireTabs}
          options={{
            tabBarIcon: ({ color }) => (
              <ProprietaireSVG fill={color} width="24" height="24" />
            ),
          }}
        />
        <Tab.Screen
          name="Gardien"
          component={GardienTabs}
          options={{
            tabBarIcon: ({ color }) => (
              <GardienSVG fill={color} width="24" height="24" />
            ),
          }}
        />
        <Tab.Screen
          name="Botaniste"
          component={BotanisteTabs}
          options={{
            tabBarIcon: ({ color }) => (
              <BotannisteSVG fill={color} width="24" height="24" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;