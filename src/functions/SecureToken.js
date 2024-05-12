import * as SecureStore from "expo-secure-store";
import API from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToken(token) {
  await SecureStore.setItemAsync("userToken", token);
}
export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    return token;
  } catch (err) {
    await SecureStore.deleteItemAsync("userToken");
    return null;
  }
}


export async function isTokenValid() {
  const token = await getToken();

  if (token) {
    try {
      await API.post("/verify_token", { token: token })
        .then(res => {
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


export async function deleteToken() {
  return await SecureStore.deleteItemAsync("userToken");
}
