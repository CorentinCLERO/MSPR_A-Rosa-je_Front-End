import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { colors } from "../functions/colors";
import MyContext from "../Context/MyContext";

export default function NewMessage({userSelected, setMessages}) {
  const { user, addMessages } = useContext(MyContext);
  const [content, setcontent] = useState("");
  const [loading, setloading] = useState(false);

  const sendMessage = async () => {
    if (content.trim() === "") return;
    setloading(true);
    const message = {
      content,
      senderId: user.id,
      receiverId: userSelected.id
    };
    const newMessage = await addMessages(message);
    setMessages(prevMessages =>[...prevMessages, newMessage]);
    setcontent("");
    setloading(false);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TextInput 
        value={content}
        onChangeText={setcontent}
        multiline
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}>
        {loading ? <ActivityIndicator size="large" /> : <Text onPress={sendMessage} style={styles.buttonText}>Envoyer</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  button: {
    height: 60,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
