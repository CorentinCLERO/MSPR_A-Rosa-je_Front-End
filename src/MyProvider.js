import React, { useState, useMemo, useEffect } from "react";
import MyContext from "./MyContext";
import { plantsSOSRaw, addressesRaw } from "./data";
import API from "./api";

export const MyProvider = ({ children }) => {
  const [plantsSOS, setPlantsSOS] = useState(plantsSOSRaw);
  const [plantSittings, setPlantSittings] = useState(null);
  const [plants, setPlants] = useState(null);
  const addresses = addressesRaw;

  const addPlant = (data) => {
    return API.post("/plant",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
      .then((response) => {
        console.log("laréponse", response);
        setPlants([response.data.data, ...plants]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removePlant = (id) => {
    return API.delete(`/plant/${id}`)
      .then((response) => {
        console.log(response);
        setPlants(plants.filter((plant) => plant.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const addPlantSOS = (plant) => {
    setPlantsSOS([plant, ...plantsSOS]);
  };

  const removePlantSOS = (id) => {
    setPlantsSOS(plantsSOS.filter((plant) => plant.id !== id));
  };

  const addPlantSitting = (plant) => {
    console.log("planticxi-------------", plant.plants)
    console.log("pplantSittingsplantSittings-------------", plantSittings)
    const updatedPlantSittings = plantSittings ? [plant, ...plantSittings] : [plant];
    setPlantSittings(updatedPlantSittings);
  };

  const removePlantSitting = (id) => {
    setPlantSittings(plantSittings.filter((plant) => plant.id !== id));
  };

  const updateStatePlantSitting = (id, state) => {
    setPlantSittings(plantSittings.map((plantSitting) => (plantSitting.id === id ? { ...plantSitting, status: state } : plantSitting)));
  };

  useEffect(() => {
    getPlantFromUser();
  }, []);

  const getPlantFromUser = (id = 1) => {
    return API.get(`/plants/${id}`)
      .then((response) => {
        setPlants(response.data);
        // console.log("Plantes récupérées:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des plantes:", error);
      });
  };

  const getPlantSittingFromUser = (id = 1) => {
    return API.get(`/requests/${id}`)
      .then((response) => {
        setPlantSittings(response.data);
        // console.log("Plantes requests récupérées:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des plantes requests:", error);
      });
  };

  useEffect(() => {
    getPlantFromUser();
    getPlantSittingFromUser();
  }, []);

  const updatePlantAnswer = (id, answerInput) => {
    setPlantsSOS(plantsSOS.map((plant) => plant.id === id ? { answerInput: answerInput } : plant));
    console.log(plantsSOS);
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
    updatePlantAnswer,

  }), [plantsSOS, plantSittings, plants, addresses]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
