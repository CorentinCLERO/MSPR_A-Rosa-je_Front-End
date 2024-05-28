import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import { colors } from "../../functions/colors";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Message({message}) {
  const { user } = useContext(MyContext);

  return (
    <View 
      style={user.pseudo === message.pseudo ? styles.containerSend : styles.containerReceive}
    >
      <Text style={user.pseudo === message.pseudo ? styles.contentSend : styles.contentReceive}>{message.content}</Text>
      <Text style={user.pseudo === message.pseudo ? styles.timestampSend : styles.timestampReceive}>{format(new Date(message.timestamp), "Pp", { locale: fr })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSend: {
    alignSelf: "flex-end"
  },
  containerReceive: {
    alignSelf: "flex-start"
  },
  contentSend: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
    alignSelf: "flex-end",
    backgroundColor: colors.paleGreen,
  },
  contentReceive: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
  },
  timestampSend: {
    alignSelf: "flex-end",
    fontWeight: "bold",
    fontSize: 10,
  },
  timestampReceive: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 10,
  },
});