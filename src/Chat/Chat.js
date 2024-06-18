import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Message from "../components/Message/Message";
import NewMessage from "./NewMessage";
import MyContext from "../Context/MyContext";

export default function Chat({userSelected, setUserSelected}) {
  const { socket, getMessages, user } = useContext(MyContext);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const joinChat = async () => {
      // console.log("Attempting to join chat");

      if (socket && user?.id) {
        socket.emit("join_chat", user.id);

        socket.on("new_message", (message) => {
          setMessages((prevMessages) => [message, ...prevMessages]);
        });

        socket.on("connect", () => {
          socket.emit("join_chat", user.id);
        });

      } else {
        Alert.alert("Socket or User ID is not defined");
      }
    };

    joinChat();

    const messagesRequest = async () => {
      setLoading(true);
      const fetchedMessages = await getMessages(userSelected?.id);
      const sortedMessages = fetchedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setMessages(sortedMessages);
      setLoading(false);
    };

    messagesRequest();

    return () => {
      socket?.off("new_message");
    };
  }, [socket, userSelected]);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setUserSelected("")}>
        <Text>Retour</Text>
      </TouchableOpacity>
      {loading ?
        <ActivityIndicator size="large" /> :
        <FlatList 
          data={messages || []}
          renderItem={({item, index}) => <Message key={index} message={item} />}  
          keyExtractor={item => item.id}
          inverted={true}
        />
      }
      <NewMessage {...{userSelected, setMessages}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20
  },
});