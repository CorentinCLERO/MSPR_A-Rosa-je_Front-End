import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import Map from "../Map/Map";
import Missions from "../Missions/Missions";
import MapSVG from "../../assets/iconesTabs/map.svg";
import MissionSVG from "../../assets/iconesTabs/mission.svg";
import PlantSOSSVG from "../../assets/iconesTabs/plantSOS.svg";
import PlantSOSGardien from "../PlantSOSGardien/PlantSOSGardien";

const GardienTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: ({ color }) => (
              <MapSVG fill={color} width="24" height="24" />
            ),
          }}
        />
        <Tab.Screen
          name="Missions"
          component={Missions}
          options={{
            tabBarIcon: ({ color }) => (
              <MissionSVG fill={color} width="24" height="24" />
            ),
          }}
        />
        <Tab.Screen
          name="PlantSOS"
          component={PlantSOSGardien}
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

export default GardienTabs;