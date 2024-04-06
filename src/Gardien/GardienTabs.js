import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import Map from "../Map/Map";
import Missions from "../Missions/Missions";
import PlantSOSGardien from "../PlantSOSGardien/PlantSOSGardien";
import { MapSVG } from "../../assets/iconesTabs/Map";
import { MissionSVG } from "../../assets/iconesTabs/Mission";
import { PlantSOSSVG } from "../../assets/iconesTabs/PlantSOS";
import { StyleSheet, View } from "react-native";
import { colors } from "../colors";


const GardienTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <View style={{ backgroundColor: colors.background, flex: 1, marginBottom: -20 }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          barStyle={styles.navigator}
          activeColor={colors.blue}
          inactiveColor="#FFFFFF"
          labeled={false}>
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
                <MissionSVG fill={color} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: colors.paleGreen,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: "hidden",
    marginBottom: 10,
    marginHorizontal: 20,
  }
});

export default GardienTabs;