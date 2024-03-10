import React, { useState, useMemo, useEffect } from "react";
import MyContext from "./MyContext";
import { missionRaw, plantListRaw, plantsSOSRaw, plantSittingRaw } from "./data";

export const MyProvider = ({ children }) => {
  const [missions, setMissions] = useState(missionRaw);
  const [plantsSOS, setPlantsSOS] = useState(plantsSOSRaw);
  const [plantSittings, setPlantSittings] = useState(plantSittingRaw);
  const [plants, setPlants] = useState(plantListRaw);

  const addMission = (plant) => {
    setMissions([...missions, { id: Math.floor(Math.random() * 1000000), pseudo: "coco", adress: { number: "28", street: "rue Marbeau", city: "Paris", }, reason: plant.reason, plants: plant.plants, beginDate: plant.beginDate, endDate: plant.endDate, longitude: plant.longitude, latitude: plant.latitude, status: "En cours", plant: plant }]);
  };

  const removeMission = (id) => {
    setMissions(missions.filter((mission) => mission.id !== id));
  };

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

  // useMemo ensures the context value is memoized, only recalculating when necessary
  const value = useMemo(() => ({
    missions,
    addMission,
    removeMission,
    plantsSOS,
    addPlantSOS,
    removePlantSOS,
    plantSittings,
    addPlantSitting,
    removePlantSitting,
    plants,
    addPlant,
    removePlant,
  }), [missions, plantsSOS, plantSittings, plants]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
