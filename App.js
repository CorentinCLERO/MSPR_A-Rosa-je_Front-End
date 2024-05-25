import React from "react";
import { AppRegistry, SafeAreaView, StyleSheet, Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import Tabs from "./src/Tabs";
import {StatusBar} from "expo-status-bar";
import { MyProvider } from "./src/Context/MyProvider";
import { colors } from "./src/functions/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <MyProvider>
          <Tabs />
          <StatusBar
            style="dark"
            translucent={true}
            hidden={false}
          />
        </MyProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 10 : 0,
    backgroundColor: colors.background,
  },
});

AppRegistry.registerComponent(appName, () => App);