import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import Plantsitting from "../Plantssitting/Plantsitting";
import Plantes from "../Plantes/Plantes";
import PlantSittingSVG from "../../assets/iconesTabs/plantSitting.svg";
import PlantSVG from "../../assets/iconesTabs/plant.svg";
import { colors } from "../colors";
import { StyleSheet } from "react-native";
import { plantListRaw, plantSittingRaw } from "../data";


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
          {() => <Plantsitting {...{ plantSittingList, addPlantSitting, deletePlantSitting, plantList }} />}
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
    overflow: "hidden",
  }
});

export default ClientTabs;