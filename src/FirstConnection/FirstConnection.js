import React, { useContext, useState } from "react";
import { Text, TextInput, View, Switch, Button, StyleSheet } from "react-native";
import MyContext from "../Context/MyContext";
import { colors } from "../functions/colors";

const FirstConnection = () => {
  const { user, updateUser } = useContext(MyContext);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [pseudo, setPseudo] = useState(user.pseudo);
  const [wantToBeKeeper, setWantToBeKeeper] = useState(user.wantToBeKeeper);

  const handleSave = () => {
    const updatedUser = {
      firstname,
      lastname,
      pseudo,
      wantToBeKeeper,
      firstLogin: false,
    };
    updateUser(updatedUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Informations personnelles</Text>
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
      />
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={user.email}
        editable={false}
      />
      {user.role === "owner" && <View style={styles.switchContainer}>
        <Text>Veux-tu être gardien ?</Text>
        <Switch
          value={wantToBeKeeper}
          onValueChange={setWantToBeKeeper}
        />
      </View>}
      <Button title="Valider" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default FirstConnection;
