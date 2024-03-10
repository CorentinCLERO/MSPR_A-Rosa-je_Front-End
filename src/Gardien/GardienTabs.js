import React, { useState, useContext } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import Map from "../Map/Map";
import Missions from "../Missions/Missions";
import MapSVG from "../../assets/iconesTabs/map.svg";
import MissionSVG from "../../assets/iconesTabs/mission.svg";
import PlantSOSSVG from "../../assets/iconesTabs/plantSOS.svg";
import PlantSOSGardien from "../PlantSOSGardien/PlantSOSGardien";
import MyContext from "../MyContext";


const GardienTabs = () => {
  const Tab = createMaterialBottomTabNavigator();
  const { missions, addMission, removeMission, removePlantSitting, addPlantSitting, plantSitting } = useContext(MyContext);


  const KeepPlant = (plant) => {
    removePlantSitting(plant.id);
    addMission(plant);
  };

  const deleteMission = (plant) => {
    removeMission(plant.id);
    if (plant?.plant) addPlantSitting(plant.plant);
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          options={{
            tabBarIcon: ({ color }) => (
              <MapSVG fill={color} width="24" height="24" />
            ),
          }}
        >
          {() => <Map {...{ KeepPlant }} plantSittingRequest={plantSitting.filter((plant) => plant.status === "En attente")} />}
        </Tab.Screen>
        <Tab.Screen
          name="Missions"
          options={{
            tabBarIcon: ({ color }) => (
              <MissionSVG fill={color} width="24" height="24" />
            ),
          }}
        >
          {() => <Missions {...{ missions, deleteMission }} />}
        </Tab.Screen>
        <Tab.Screen
          name="PlantSOS"
          options={{
            tabBarIcon: ({ color }) => (
              <PlantSOSSVG fill={color} width="24" height="24" />
            ),
          }}
        >
          {() => <PlantSOSGardien {...{}} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default GardienTabs;