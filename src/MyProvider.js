import React, { useState, useMemo, useEffect } from "react";
import MyContext from "./MyContext";
import { plantListRaw, plantsSOSRaw, plantSittingRaw, addressesRaw } from "./data";
import axios from "axios";

export const MyProvider = ({ children }) => {
  const [plantsSOS, setPlantsSOS] = useState(plantsSOSRaw);
  const [plantSittings, setPlantSittings] = useState(plantSittingRaw);
  const [plants, setPlants] = useState(plantListRaw);
  const addresses = addressesRaw;

  const addPlant = (data) => {
    console.log("plant", data);
    return axios({
      method: "POST",
      url: `${process.env.EXPO_PUBLIC_API_URL}/api/plant`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("laréponse", response);
        setPlants([response.data.data, ...plants]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removePlant = (id) => {
    axios({
      method: "DELETE",
      url: `${process.env.EXPO_PUBLIC_API_URL}/api/plant/${id}`,
    }) 
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
    setPlantSittings([plant, ...plantSittings]);
  };

  const removePlantSitting = (id) => {
    setPlantSittings(plantSittings.filter((plant) => plant.id !== id));
  };

  const updateStatePlantSitting = (id, state) => {
    setPlantSittings(plantSittings.map((plantSitting) => (plantSitting.id === id ? { ...plantSitting, status: state } : plantSitting)));
  };

  const getPlantFromUser = (id = 1) => {
    axios({ method: "GET", url: `${process.env.EXPO_PUBLIC_API_URL}/api/plants/${id}`, })
      .then((response) => {
        setPlants(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPlantFromUser();
  }, []);


  const getPlantFromUser = (id = 1) => {
    axios({ method: "GET", url: `${process.env.EXPO_PUBLIC_API_URL}/api/plants/${id}`, })
      .then((response) => {
        setPlants(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const updatePlantAnswer = ( id, answerInput ) => {
    setPlantsSOS(plantsSOS.map((plant) => plant.id === id ? { answerInput: answerInput} : plant ));
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
