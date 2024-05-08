import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { PlantSOSSVG } from "../../assets/iconesTabs/PlantSOS";
import PlantSOSBotaniste from "./PlantSOSBotaniste/PlantSOSBotaniste";
import { plantSOSRaw } from "../data";
import { colors } from "../functions/colors";
import { StyleSheet, View } from "react-native";

const BotanisteTabs = () => {
  const Tab = createMaterialBottomTabNavigator();


  const [plantSOSListe , setPlantSOSListe ] = useState(plantSOSRaw);

  return (
    <View style={{ backgroundColor: colors.background, flex: 1, marginBottom: -20 }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          barStyle={styles.navigator}
          activeColor={colors.blue}
          inactiveColor={colors.white}
          labeled={false}
        >
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

export default BotanisteTabs;