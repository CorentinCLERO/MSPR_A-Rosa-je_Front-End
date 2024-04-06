import * as React from "react";
import { AppRegistry, SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import Tabs from "./src/Tabs";
import { MyProvider } from "./src/MyProvider";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <MyProvider>
          <Tabs />
        </MyProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

AppRegistry.registerComponent(appName, () => App);