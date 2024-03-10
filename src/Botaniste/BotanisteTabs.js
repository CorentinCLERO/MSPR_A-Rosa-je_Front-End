import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import PlantSOSSVG from "../../assets/iconesTabs/plantSOS.svg";
import PlantSOSBotaniste from "../PlantSOSBotaniste/PlantSOSBotaniste";

const BotanisteTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="PlantSOS"
          options={{
            tabBarIcon: ({ color }) => (
              <PlantSOSSVG fill={color} width="24" height="24" />
            ),
          }}
        >
          {() => <PlantSOSBotaniste />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BotanisteTabs;