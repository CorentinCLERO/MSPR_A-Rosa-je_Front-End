import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import Plantsitting from "../Plantssitting/Plantsitting";
import Plantes from "../Plantes/Plantes";
import PlantSittingSVG from "../../assets/iconesTabs/plantSitting.svg";
import PlantSVG from "../../assets/iconesTabs/plant.svg";
import { colors } from "../colors";
import { StyleSheet } from "react-native";


const ClientTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator barStyle={styles.navigator}>
        <Tab.Screen
          name="Plantes"
          component={Plantes}
          options={{
            tabBarIcon: ({ color }) => (
              <PlantSVG fill={color} width="24" height="24" />
            ),
          }}
        />
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