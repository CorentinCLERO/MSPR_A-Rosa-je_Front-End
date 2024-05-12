import React, { useState, useMemo, useEffect } from "react";
import API from "../functions/api";
import MyContext from "./MyContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { isTokenValid, saveToken } from "../functions/SecureToken";

export const MyProvider = ({ children }) => {
  const [plantsSOS, setPlantsSOS] = useState(null);
  const [plantSittings, setPlantSittings] = useState(null);
  const [userPlantSittings, setUserPlantSittings] = useState(null);
  const [plants, setPlants] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState(undefined);
  const [pageDisplayed, setPageDisplayed] = useState(undefined);
  const [userToken, setUserToken] = useState(false);
  const [userRoleLevel, setUserRoleLevel] = useState(0);

  useEffect(() => {
    const roleToLevel = {
      "owner": 1,
      "keeper": 2,
      "botanist": 3,
      "admin": 4
    };

    const level = roleToLevel[userRole] || 0;
    
    setUserRoleLevel(level);
  }, [userRole]);

  const setPageDisplayedByRole = (newPage) => {
    const pageLevels = {
      "owner": 1,
      "keeper": 2,
      "botanist": 3,
      "admin": 4
    };

    const newPageLevel = pageLevels[newPage] || 0;

    if (userRoleLevel >= newPageLevel) {
      setPageDisplayed(newPage);
    } else {
      Alert.alert(
        "Accès refusé",
        "Votre rôle ne permet pas d'accéder aux pages souhaitées."
      );
    }
  };

  const addPlant = (data) => {
    return new Promise((resolve, reject) => {
      API.post("/plant",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
        .then((response) => {
          setPlants([response.data.data, ...plants]);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const removePlant = (id) => {
    return new Promise((resolve, reject) => {
      API.delete(`/plant/${id}`)
        .then((response) => {
          setPlants(plants.filter((plant) => plant.id !== id));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const addPlantSitting = (data) => {
    return new Promise((resolve, reject) => {
      API.post("/request",
        { ...data, userId: 1 },
      )
        .then((response) => {
          const datatToInsert = { ...data, status: "slot", id: response.data.requestId };
          const updatedPlantSittings = plantSittings ? [datatToInsert, ...plantSittings] : [datatToInsert];
          setPlantSittings(updatedPlantSittings);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const removePlantSitting = (id) => {
    return new Promise((resolve, reject) => {
      API.delete(`/request/${id}`)
        .then((response) => {
          setPlantSittings(plantSittings.filter((plant) => plant.id !== id));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const updateStatePlantSitting = (id, state) => {
    setPlantSittings(plantSittings.map((plantSitting) => (plantSitting.id === id ? { ...plantSitting, status: state } : plantSitting)));
  };

  const addPlantSOS = (plant) => {
    setPlantsSOS([plant, ...plantsSOS]);
  };

  const removePlantSOS = (id) => {
    setPlantsSOS(plantsSOS.filter((plant) => plant.id !== id));
  };

  const getPlantFromUser = (id) => {
    return new Promise((resolve, reject) => {
      API.get(`/plants/${id}`)
        .then((response) => {
          setPlants(response.data);
          resolve(response);
        })
        .catch((error) => {
          console.log("Erreur lors de la récupération des plantes:", error.response.data);
          if (error.response && error.response.status === 418) {
            deconnection();
          }
          reject(error);
        });
    });
  };

  const getPlantSittingFromUser = (id) => {
    return new Promise((resolve, reject) => {
      API.get(`/requests/${id}`)
        .then((response) => {
          setUserPlantSittings(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getAllPlantSitting = () => {
    return new Promise((resolve, reject) => {
      API.get("/requests")
        .then((response) => {
          setPlantSittings(response.data);
          resolve(response);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des plantes requests:", error);
          reject(error);
        });
    });
  };

  const getAdressesFromUser = (id) => {
    return new Promise((resolve, reject) => {
      API.get(`/adresses/${id}`)
        .then((response) => {
          setAddresses(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getPlantSOSFromUser = (id) => {
    return new Promise((resolve, reject) => {
      API.get(`/plantsos/${id}`)
        .then((response) => {
          setPlantsSOS(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const deconnection = () => {
    API.post("/denyjwt", { token: userToken });
    AsyncStorage.removeItem("id");
    AsyncStorage.removeItem("role");
    setPageDisplayed(null);
    setUserRole(null);
    setPlants([]);
    setPlantSittings([]);
    setAddresses([]);
    setPlantsSOS([]);
    setIsLogged(false);
    setUserToken(false);
    SecureStore.deleteItemAsync("userToken");
  };

  const updatePlantAnswer = (id, answerInput) => {
    setPlantsSOS(plantsSOS.map((plant) => plant.id === id ? { ...plant, answerInput: answerInput } : plant));
  };

  const handleSignIn = (userInfo) => {
    API.post("/login_user", {
      idToken: userInfo.idToken,
    })
      .then((response) => {
        saveToken(response.data.token);
        setUserToken(true);
        setIsLogged(true);
        AsyncStorage.setItem("role", response.data.role);
        AsyncStorage.setItem("id", response.data.id.toString());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        setIsLoading(true);
        try {
          const id = await AsyncStorage.getItem("id");
          const role = await AsyncStorage.getItem("role");
          setUserRole(role);
          setPageDisplayed(role);
          const userLevels = {
            "owner": 1,
            "keeper": 2,
            "botanist": 3,
            "admin": 4
          };

          if (userLevels[role] > 0 && id) {
            await Promise.all([
              getPlantFromUser(id),
              getPlantSittingFromUser(id),
              getAdressesFromUser(id)
            ]);
          }

          if (userLevels[role] > 1 && id) {
            await Promise.all([
              getAllPlantSitting(),
              getPlantSOSFromUser(id)
            ]);
          }

          // await Promise.all([
          //   getPlantFromUser(),
          //   getPlantSittingFromUser(),
          //   getAdressesFromUser(),
          // ]);

          setIsLoading(false);
        } catch (error) {
          console.error("An error occurred:", error);
          setIsError(true);
        }
      }
    }

    fetchData();
  }, [isLogged]);

  useEffect(() => {
    async function checkToken() {
      const userValidity = await isTokenValid();
      setUserToken(userValidity);
      setIsLogged(userValidity);
    }
    checkToken();
  }, []);

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
    isLoading,
    isError,
    isLogged,
    setIsLogged,
    pageDisplayed,
    setPageDisplayedByRole,
    deconnection,
    userToken,
    setUserToken,
    handleSignIn,
    userRole,
    userRoleLevel,
    userPlantSittings,
  }), [plantsSOS, plantSittings, plants, userPlantSittings, addresses, isLoading, isError, pageDisplayed, isLogged]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
