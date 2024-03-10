import React, { useState, useMemo } from "react";
import MyContext from "./MyContext";
import { missionRaw, plantListRaw, plantSOSRaw, plantSittingRaw } from "./data";

export const MyProvider = ({ children }) => {
  const [missions, setMissions] = useState(missionRaw);
  const [plantSOS, setPlantSOS] = useState(plantSOSRaw);
  const [plantSitting, setPlantSitting] = useState(plantSittingRaw);
  const [plants, setPlants] = useState(plantListRaw);

  const addMission = (plant) => {
    setMissions([...missions, { id: Math.floor(Math.random() * 1000000), pseudo: "coco", adress: { number: "28", street: "rue Marbeau", city: "Paris", }, reason: plant.reason, plants: plant.plants, beginDate: plant.beginDate, endDate: plant.endDate, longitude: plant.longitude, latitude: plant.latitude, status: "En cours", plant: plant }]);
  };

  const removeMission = (id) => {
    setMissions(missions.filter((mission) => mission.id !== id));
  };

  const addPlant = (plant) => {
    setPlants([...plants, plant]);
  };

  const removePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  const addPlantSOS = (plant) => {
    setPlantSOS([...plantSOS, plant]);
  };

  const removePlantSOS = (id) => {
    setPlantSOS(plantSOS.filter((plant) => plant.id !== id));
  };

  const addPlantSitting = (plant) => {
    setPlantSitting([...plantSitting, plant]);
  };

  const removePlantSitting = (id) => {
    setPlantSitting(plantSitting.filter((plant) => plant.id !== id));
  };

  // useMemo ensures the context value is memoized, only recalculating when necessary
  const value = useMemo(() => ({
    missions,
    addMission,
    removeMission,
    plantSOS,
    addPlantSOS,
    removePlantSOS,
    plantSitting,
    addPlantSitting,
    removePlantSitting,
    plants,
    addPlant,
    removePlant,
  }), [missions, plantSOS, plantSitting, plants]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
