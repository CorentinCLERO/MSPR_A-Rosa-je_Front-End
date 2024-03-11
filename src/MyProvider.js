import React, { useState, useMemo } from "react";
import MyContext from "./MyContext";
import { plantListRaw, plantsSOSRaw, plantSittingRaw, addressesRaw } from "./data";

export const MyProvider = ({ children }) => {
  const [plantsSOS, setPlantsSOS] = useState(plantsSOSRaw);
  const [plantSittings, setPlantSittings] = useState(plantSittingRaw);
  const [plants, setPlants] = useState(plantListRaw);
  const addresses = addressesRaw;

  const addPlant = (plant) => {
    setPlants([plant, ...plants]);
  };

  const removePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  const addPlantSOS = (plant) => {
    setPlantsSOS([plant, ...plantsSOS]);
  };

  const removePlantSOS = (id) => {
    setPlantsSOS(plantsSOS.filter((plant) => plant.id !== id));
  };

  const addPlantSitting = (plant) => {
    setPlantSittings([plant, ...plantSittings]);
  };

  const removePlantSitting = (id) => {
    setPlantSittings(plantSittings.filter((plant) => plant.id !== id));
  };

  const updateStatePlantSitting = (id, state) => {
    setPlantSittings(plantSittings.map((plantSitting) => (plantSitting.id === id ? {...plantSitting, status: state} : plantSitting)));
  };

  // useMemo ensures the context value is memoized, only recalculating when necessary
  const value = useMemo(() => ({
    plantsSOS,
    addPlantSOS,
    removePlantSOS,
    plantSittings,
    addPlantSitting,
    removePlantSitting,
    updateStatePlantSitting,
    plants,
    addPlant,
    removePlant,
    addresses,
  }), [plantsSOS, plantSittings, plants, addresses]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
