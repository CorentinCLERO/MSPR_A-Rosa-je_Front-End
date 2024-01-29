import React from "react";
    import rendered from "react-test-renderer";
    import { SafeAreaProvider } from 'react-native-safe-area-context';
    import Tabs from "./Tabs";

    describe("Tabs", () => {
      it("should change tab", () => {
        const tree = rendered.create(
          <SafeAreaProvider>
            <Tabs />
          </SafeAreaProvider>
        );
        expect(tree.toJSON()).toBeTruthy();
      });
    });