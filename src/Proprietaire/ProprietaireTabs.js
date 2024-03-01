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

export const plantSittingRaw = [
  {
    id: 1,
    reason: 'Vacances aux Bahamas',
    description: 'Elle doivent être arrosé tout les jours',
    plants: [{
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
    }],
    beginDate: '2024-03-04T00:00:00.000Z',
    endDate: '2024-03-10T00:00:00.000Z',
    status: 'En attente'
  },
  {
    id: 2,
    reason: 'Vacances aux Bahamas',
    description: 'Elle doivent être arrosé tout les jours',
    plants: [{
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
    }],
    beginDate: '2024-03-04T00:00:00.000Z',
    endDate: '2024-03-10T00:00:00.000Z',
    status: 'En attente'
  },
  {
    id: 3,
    reason: 'Vacances aux Bahamas',
    description: 'Elle doivent être arrosé tout les jours',
    plants: [{
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
    }],
    beginDate: '2024-03-04T00:00:00.000Z',
    endDate: '2024-03-10T00:00:00.000Z',
    status: 'En attente'
  },
  {
    id: 4,
    reason: 'Vacances aux Bahamas',
    description: 'Elle doivent être arrosé tout les jours',
    plants: [{
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
    }],
    beginDate: '2024-03-04T00:00:00.000Z',
    endDate: '2024-03-10T00:00:00.000Z',
    status: 'En attente'
  },
  {
    id: 5,
    reason: 'Urgence en Corse',
    description: 'Elle doivent être arrosé tout les 5 jours',
    plants: [{
      id: 51,
      variety: 'Caaaaactus',
      movable: true,
      url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194'
    }],
    beginDate: '2024-04-04T00:00:00.000Z',
    endDate: '2024-04-10T00:00:00.000Z',
    status: 'En cours'
  },
  {
    id: 6,
    reason: 'Déplacement en Espagne',
    description: 'Elle doivent être arrosé une fois par semaine',
    plants: [{
      id: 29,
      variety: 'Roooooose',
      movable: false,
      url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg'
    }],
    beginDate: '2024-04-04T00:00:00.000Z',
    endDate: '2024-04-10T00:00:00.000Z',
    status: 'En cours'
  },
  {
    id: 7,
    reason: 'Urgence en Corse',
    description: 'Elle doivent être arrosé tout les 5 jours',
    plants: [{
      id: 51,
      variety: 'Caaaaactus',
      movable: true,
      url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194'
    }],
    beginDate: '2024-04-04T00:00:00.000Z',
    endDate: '2024-04-10T00:00:00.000Z',
    status: 'En cours'
  },
  {
    id: 8,
    reason: 'Déplacement en Espagne',
    description: 'Elle doivent être arrosé une fois par semaine',
    plants: [{
      id: 29,
      variety: 'Roooooose',
      movable: false,
      url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg'
    }],
    beginDate: '2024-04-04T00:00:00.000Z',
    endDate: '2024-04-10T00:00:00.000Z',
    status: 'En cours'
  },
];

const ClientTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  const [plantList, setPlantList] = useState(plantListRaw);
  const [plantSittingList, setPlantSittingList] = useState(plantSittingRaw);

  const deletePlant = (plantId) => {
    setPlantList(currentList => currentList.filter(plant => plant.id !== plantId));
  };

  const addPlant = (newPlant) => {
    setPlantList(currentList => [...[newPlant], ...currentList]);
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator barStyle={{ backgroundColor: '#FFF', borderTopRightRadius: 10, borderTopLeftRadius: 10, shadowColor: 'green', borderWidth: 2, borderBottomWidth: 0, overflow: 'hidden', elevation: 15 }}>
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
          options={{
            tabBarIcon: ({ color }) => (
              <PlantSittingSVG fill={color} width="24" height="24" />
            ),
          }}
        >
          {() => <Plantsitting {...{ plantSittingList }} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ClientTabs;