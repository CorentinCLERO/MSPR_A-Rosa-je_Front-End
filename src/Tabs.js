import React, { useContext } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import ProprietaireTabs from "./Proprietaire/ProprietaireTabs";
import GardienTabs from "./Gardien/GardienTabs";
import BotanisteTabs from "./Botaniste/BotanisteTabs";
import { GardienSVG } from "../assets/iconesTabs/Gardien";
import { BotanisteSVG } from "../assets/iconesTabs/Botaniste";
import { ProprietaireSVG } from "../assets/iconesTabs/Proprietaire";
import { colors } from "./functions/colors";
import { ActivityIndicator, View } from "react-native";
import MyContext from "./Context/MyContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tabs = () => {
  const Tab = createMaterialBottomTabNavigator();
  const { isLoading, isError } = useContext(MyContext);

  if (isError) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Icon name="lan-disconnect" color={"#ff5555"} size={24} />
    </View>
  );

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#1A98F2"/>
    </View>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: colors.green, borderTopRightRadius: 20, borderTopLeftRadius: 20, overflow: "hidden", marginBottom: -10 }}
        activeColor={colors.blue}
        inactiveColor="#FFFFFF"
        labeled={false}
      >
        <Tab.Screen
          name="Proprietaire"
          component={ProprietaireTabs}
          options={{
            tabBarIcon: ({ color }) => (
              <ProprietaireSVG fill={color} width="24" height="24" />
            ),
          }}
        />
        <Tab.Screen
          name="Gardien"
          component={GardienTabs}
          options={{
            tabBarIcon: ({ color }) => (
              <GardienSVG fill={color} width="24" height="24" />
            ),
          }}
        />
        <Tab.Screen
          name="Botaniste"
          component={BotanisteTabs}
          options={{
            tabBarIcon: ({ color }) => (
              <BotanisteSVG fill={color} width="24" height="24" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;