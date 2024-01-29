  import rendered from "react-test-renderer";
  import React from "react";
  import Tabs from "./Tabs";
  import ClientTabs from './Client/ClientTabs';
  import { SafeAreaProvider } from 'react-native-safe-area-context';

  describe("Tabs", () => {
    it("should change tab", () => {
      const tree = rendered.create(
        <SafeAreaProvider>
          <Tabs />
        </SafeAreaProvider>
      ).toJSON();

      console.log(tree.toJSON)
      
      // Recherchez le composant ClientTabs dans l'arbre de rendu
      const clientTabsComponent = tree.root.findByType(ClientTabs);
  
      // Vérifiez que le composant ClientTabs est rendu
      expect(clientTabsComponent).toBeTruthy();
    });
  });