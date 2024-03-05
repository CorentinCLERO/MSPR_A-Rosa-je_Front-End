import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import Plantsitting from '../Plantssitting/Plantsitting';
import Plantes from '../Plantes/Plantes';
import PlantSittingSVG from '../../assets/iconesTabs/plantSitting.svg';
import PlantSVG from '../../assets/iconesTabs/plant.svg';
import { colors } from '../colors';
import { StyleSheet } from 'react-native';

export const plantListRaw = [
  {
    id: 1,
    variety: 'Cactus',
    movable: true,
    url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194',
    message: 'Elle doivent être arrosé tout les jours et bla et bla et bla et bla et bla et bla',
  },
  {
    id: 2,
    variety: 'Rose',
    movable: false,
    url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg',
    message: 'Elle doivent être arrosé tout les 5 jours',
  },
  {
    id: 51,
    variety: 'Caaaaactus',
    movable: true,
    url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194',
    message: 'Elle doivent être arrosé tout les 4 jours',
  },
  {
    id: 29,
    variety: 'Roooooose',
    movable: false,
    url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg',
    message: 'Elle doivent être arrosé tout les 6 jours',
  },
  {
    id: 241,
    variety: 'Caactus',
    movable: true,
    url: 'https://www.mooseplantshop.co.uk/cdn/shop/products/bunnyears_300x300.jpg?v=1647530194',
    message: 'Elle doivent être arrosé tout les 9 jours',
  },
  {
    id: 234,
    variety: 'Rooose',
    movable: false,
    url: 'https://lejardindu19eme.files.wordpress.com/2016/01/rosier-penny-lane.jpg',
    message: 'Elle doivent être arrosé tout les 2 jours',
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

  const addPlant = (newPlant) => {
    setPlantList(currentList => [...[newPlant], ...currentList]);
  };

  const deletePlant = (plantId) => {
    setPlantList(currentList => currentList.filter(plant => plant.id !== plantId));
  };

  const addPlantSitting = (newPlant) => {
    setPlantSittingList(currentList => [...[newPlant], ...currentList]);
  };

  const deletePlantSitting = (plantId) => {
    setPlantSittingList(currentList => currentList.filter(plant => plant.id !== plantId));
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator barStyle={styles.navigator}>
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
          {() => <Plantsitting {...{ plantSittingList, addPlantSitting, deletePlantSitting }} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    overflow: 'hidden',
  }
});

export default ClientTabs;