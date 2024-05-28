import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import Chat from "./Chat";
import { colors } from "../functions/colors";
import { useFocusEffect } from "@react-navigation/native";
import MyContext from "../Context/MyContext";

export default function Messaging() {
  const { getChats } = useContext(MyContext);
  const [userSelected, setUserSelected] = useState("");
  const [chats, setChats] = useState(null);
  const [chatsLoading, setChatsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (!chats) setChatsLoading(true);
        // console.log("Écran focalisé");
        const chatsResearched = await getChats();
        setChats(chatsResearched);
        setChatsLoading(false);
      };

      fetchData();

      return () => {
        // console.log("Écran défocalisé");
        setUserSelected("");
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      {!userSelected && <Text>Liste des messages :</Text>}
      {userSelected ? <Chat {...{userSelected, setUserSelected}} /> : 
        <View style={styles.flatListContainer}>
          {!chatsLoading ?
            <FlatList
              data={chats || []}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      setUserSelected(item);
                    }}
                    style={styles.item}
                  >
                    {item?.pseudo}
                  </Text>
                </TouchableOpacity>
              )}
            /> :
            <ActivityIndicator size="large" />
          }
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    padding: 20,
    fontSize: 18,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    borderColor: colors.green,
    borderWidth: 1,
    marginBottom: 10,
  },
});