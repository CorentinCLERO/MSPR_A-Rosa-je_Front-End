import React from "react";
import Plantes from "./Plantes";
import { render, cleanup } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

describe("Plantes", () => {
  let utils;

  const mockPlantList = [
    { id: 1, name: "Cactus", variety: "Saguaro", movable: true, url: "https://example.com/cactus.jpg" },
    { id: 2, name: "Rose", variety: "Rose rouge", movable: false, url: "https://example.com/rose.jpg" }
  ];

  beforeEach(() => {
    utils = render(
      <SafeAreaProvider>
        <Plantes plantList={mockPlantList} />
      </SafeAreaProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Plantes exist", () => {
    expect(utils.toJSON()).toBeTruthy();
  });

  it("should display 'Vos plantes :'", () => {
    const { findByText } = utils;
    const textElement = findByText("Vos plantes :");
    expect(textElement).toBeTruthy();
  });

  it("displays the plant cards correctly", () => {
    const { findByText } = utils;
    const plantName = findByText(mockPlantList[0].variety);
    expect(plantName).toBeTruthy();
  });
});
