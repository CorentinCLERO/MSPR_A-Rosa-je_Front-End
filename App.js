import * as React from 'react';
import { AppRegistry, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Tabs from './src/Tabs';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <Tabs />
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

AppRegistry.registerComponent(appName, () => App);