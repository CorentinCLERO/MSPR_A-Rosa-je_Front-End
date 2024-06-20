import React, { useState, useMemo, useEffect } from "react";
import MyContext from "./MyContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { getToken, saveToken } from "../functions/SecureToken";
import API from "../functions/api";
import APIC from "../functions/apiConnection";
import { io } from "socket.io-client";

export const MyProvider = ({ children }) => {
  const [plantsSOS, setPlantsSOS] = useState(null);
  const [userPlantsSOS, setUserPlantsSOS] = useState(null);
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
  const [firstConnection, setFirstConnection] = useState(false);
  const [userRoleLevel, setUserRoleLevel] = useState(0);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null); 

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
          const updatedUserPlantSittings = userPlantSittings ? [datatToInsert, ...userPlantSittings] : [datatToInsert];
          setUserPlantSittings(updatedUserPlantSittings);
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
          setUserPlantSittings(userPlantSittings.filter((plant) => plant.id !== id));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const deleteUser = () => {
    return new Promise((resolve, reject) => {
      API.delete(`/user/${user.id}`)
        .then((response) => {
          deconnection();
          resolve(response);
        })
        .catch((error) => {
          Alert.alert("Erreur", "Une erreur est survenue lors de la suppression de votre compte.");
          reject(error);
        });
    });
  };

  const updateStatePlantSitting = (plantId, status) => {
    return new Promise((resolve, reject) => {
      API.put(`/request/${plantId}`, {status})
        .then(response => {
          setPlantSittings(plantSittings.map((plantSitting) => (plantSitting.id === plantId ? { ...plantSitting, status: status } : plantSitting)));
          resolve(response);
        })
        .catch(error => {
          Alert.alert("Erreur", "Une erreur est survenue lors de la suppression de votre compte.");
          reject(error);
        });
    });
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
          setUserPlantsSOS(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getAllPlantSOS = () => {
    return new Promise((resolve, reject) => {
      API.get("/plantsos")
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
    setUserPlantSittings([]);
    setUserPlantsSOS([]);
    setIsLogged(false);
    setUserToken(false);
    SecureStore.deleteItemAsync("userToken");
  };

  const updatePlantAnswer = (id, answerInput) => {
    setPlantsSOS(plantsSOS.map((plant) => plant.id === id ? { ...plant, answerInput: answerInput } : plant));
  };

  const handleSignIn = (userInfo) => {
    APIC.post("/login_user", {
      ...userInfo
    })
      .then((response) => {
        AsyncStorage.setItem("role", response.data.role);
        AsyncStorage.setItem("id", response.data.id.toString());
        setUser(response.data.user);
        saveToken(response.data.token);
        setUserToken(true);
        setIsLogged(true);
        setFirstConnection(response.data.user?.firstLogin);
      })
      .catch((error) => {
        Alert.alert("Echec", `Connexion échouée : ${error}`);
      });
  };

  const updateUser = (data) => {
    API.patch(`/user/${user.id}`, {...data})
      .then((res) => {
        setUser(res.data.user);
        setFirstConnection(res.data.firstLogin);
      }).catch(err => {
        Alert.alert("Echec", `Modifications échouées : ${err}`);
      });
  };

  const addAddress = (data) => {
    API.post(`/adresse/${user.id}`, data)
      .then((res) => {
        setAddresses((prevAddresses) => [...prevAddresses, res.data]);
      })
      .catch((err) => {
        Alert.alert("Echec", `Ajout de l'adresse échoué : ${err}`);
      });
  };

  const deleteAddress = (id) => {
    API.delete(`/adresse/${id}`)
      .then(() => {
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== id)
        );
      })
      .catch((err) => {
        Alert.alert("Echec", `Suppression de l'adresse échouée : ${err}`);
      });
  };

  const getChats = async () => {
    try {
      const res = await API.get(`/all_messages/${user.id}`);
      return res.data;
    } catch (err) {
      Alert.alert("Echec", `Recherche des discussions échouée : ${err}`);
    }
  };

  const getMessages = async (id) => {
    try {
      const res = await API.get(`/messages/${user.id}/${id}`);
      return res.data;
    } catch (err) {
      Alert.alert("Echec", `Recherche des messages échouée : ${err}`);
    }
  };

  const addMessages = async (data) => {
    try {
      const res = await API.post("/message", data);
      return {...res.data, pseudo: user.pseudo};
    } catch (err) {
      Alert.alert("Echec", `Recherche des messages échouée : ${err}`);
    }
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

          if (userLevels[role] > 2 && id) {
            await Promise.all([
              getAllPlantSOS(),
            ]);
          }

          setIsLoading(false);
        } catch (error) {
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

    async function isTokenValid() {
      const token = await getToken();
    
      if (token) {
        try {
          await APIC.post("/verify_token", { token: token })
            .then(res => {
              setFirstConnection(res.data.user?.firstLogin);
              setUser(res.data.user);
              AsyncStorage.setItem("role", res.data.role);
              AsyncStorage.setItem("id", res.data.userId.toString());
            });
          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    }

    const newSocket = io(process.env.EXPO_PUBLIC_API_URL, {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const value = useMemo(() => ({
    plantsSOS,
    userPlantsSOS,
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
    firstConnection,
    setFirstConnection,
    user,
    updateUser,
    addAddress, 
    deleteAddress,
    deleteUser,
    socket,
    getChats,
    getMessages,
    addMessages,
  }), [plantsSOS, plantSittings, plants, userPlantSittings, addresses, isLoading, isError, pageDisplayed, isLogged, firstConnection, user, socket]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
