import React from "react";
import Plantes from "./Plantes";
import rendered from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";

describe("Plantes", () => {
  let utils;

  const mockPlantList = [
    { id: 1, name: "Cactus", variety: "Saguaro", movable: true, url: "https://example.com/cactus.jpg" },
    { id: 2, name: "Rose", variety: "Rose rouge", movable: false, url: "https://example.com/rose.jpg" }
  ];

  beforeAll(() => {
    utils = rendered.create(
      <SafeAreaProvider>
        <Plantes plantList={mockPlantList} />
      </SafeAreaProvider>
    );
  });

  // afterAll(() => {
  //   cleanup();
  // }, 10000);

  it("Plantes exist", () => {
    expect(utils.toJSON()).toBeTruthy();
  });

  // it("should display 'Vos plantes :'", async () => {
  //   const { findByText } = utils;
  //   const textElement = await findByText("Vos plantes :");
  //   expect(textElement).toBeTruthy();
  // });

  // it("displays the plant cards correctly", async () => {
  //   const { findByText } = utils;
  //   const plantName = await findByText(mockPlantList[0].variety);
  //   expect(plantName).toBeTruthy();
  // });
});
