import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import Plantsitting from '../Plantssitting/Plantsitting';
import Plantes from '../Plantes/Plantes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ClientTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Plantes" component={Plantes} />
        <Tab.Screen name="Plantsitting" component={Plantsitting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ClientTabs;