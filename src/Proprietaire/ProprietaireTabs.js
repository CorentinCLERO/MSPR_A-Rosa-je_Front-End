import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import Plantsitting from '../Plantssitting/Plantsitting';
import Plantes from '../Plantes/Plantes';
import PlantSittingSVG from '../../assets/iconesTabs/plantSitting.svg';
import PlantSVG from '../../assets/iconesTabs/plant.svg';

export const plantListRaw = [
  {
    id: 1,
    variety: 'Cactus',
    movable: true,
    url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194'
  },
  {
    id: 2,
    variety: 'Rose',
    movable: false,
    url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg'
  },
  {
    id: 51,
    variety: 'Caaaaactus',
    movable: true,
    url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194'
  },
  {
    id: 29,
    variety: 'Roooooose',
    movable: false,
    url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg'
  },
  {
    id: 241,
    variety: 'Caactus',
    movable: true,
    url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194'
  },
  {
    id: 234,
    variety: 'Rooose',
    movable: false,
    url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg'
  },
];

const ClientTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  const [plantList, setPlantList] = useState(plantListRaw);

  const deletePlant = (plantId) => {
    setPlantList(currentList => currentList.filter(plant => plant.id !== plantId));
  };

  const addPlant = (newPlant) => {
    setPlantList(currentList => [...[newPlant], ...currentList]);
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Plantes"
          options={{
            tabBarIcon: ({ color }) => (
              <PlantSVG fill={color} width="24" height="24" />
            ),
          }}
        >
          {() => <Plantes {...{ plantList, deletePlant, addPlant }} />}
        </Tab.Screen>
        <Tab.Screen
          name="Plantsitting"
          component={Plantsitting}
          options={{
            tabBarIcon: ({ color }) => (
              <PlantSittingSVG fill={color} width="24" height="24" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ClientTabs;