import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import Plantsitting from "./Plantssitting/Plantsitting";
import Plantes from "./Plantes/Plantes";
import { PlantSittingSVG } from "../../assets/iconesTabs/PlantSitting";
import { PlantSVG } from "../../assets/iconesTabs/Plant";
import { colors } from "../functions/colors";
import { StyleSheet, View } from "react-native";


const ClientTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <View style={{ backgroundColor: colors.background, flex: 1, marginBottom: -20 }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          barStyle={styles.navigator}
          activeColor={colors.blue}
          inactiveColor="#FFFFFF"
          labeled={false}
        >
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

export default ClientTabs;