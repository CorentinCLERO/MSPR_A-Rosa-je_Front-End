import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { PlantSOSSVG } from "../../assets/iconesTabs/PlantSOS";
import PlantSOSBotaniste from "./PlantSOSBotaniste/PlantSOSBotaniste";
import { colors } from "../functions/colors";
import { StyleSheet, View } from "react-native";
import SettingPage from "../SettingPage/SettingPage";
import { SettingSVG } from "../../assets/iconesTabs/Setting";

const BotanisteTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          barStyle={styles.navigator}
          activeColor={colors.blue}
          inactiveColor={colors.white}
          labeled={false}
        >
          <Tab.Screen
            name="PlantSOS"
            component={PlantSOSBotaniste}
            options={{
              tabBarIcon: ({ color }) => (
                <PlantSOSSVG fill={color} width="24" height="24" />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingPage}
            options={{
              tabBarIcon: ({ color }) => (
                <SettingSVG fill={color} width="24" height="24" />
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
  },
  container: { 
    backgroundColor: colors.background, 
    flex: 1, 
    marginBottom: -20
  }
});

export default BotanisteTabs;