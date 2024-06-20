import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import MyContext from "../Context/MyContext";
import { colors } from "../functions/colors";

const ListAdresses = () => {
  const { addresses, addAddress, deleteAddress } = useContext(MyContext);
  const [newAddress, setNewAddress] = useState({
    number: "",
    street: "",
    city: "",
    country: "",
    cp: "",
  });

  const handleAddAddress = () => {
    addAddress(newAddress);
    setNewAddress({ number: "", street: "", city: "", country: "", cp: "" });
  };

  const handleDeleteAddress = (id) => {
    deleteAddress(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste d&apos;adresses</Text>
      {addresses.map((address) => (
        <View key={address.id} style={styles.addressContainer}>
          <Text style={styles.address}>{`${address.number} ${address.street}, ${address.city}, ${address.country}`}</Text>
          <Button title="Supprimer" onPress={() => handleDeleteAddress(address.id)} />
        </View>
      ))}
      <Text style={styles.header}>Ajouter une adresse</Text>
      <TextInput
        style={styles.input}
        placeholder="Numéro"
        value={newAddress.number}
        onChangeText={(text) => setNewAddress({ ...newAddress, number: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Rue"
        value={newAddress.street}
        onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={newAddress.city}
        onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Code postal"
        value={newAddress.cp}
        onChangeText={(text) => setNewAddress({ ...newAddress, cp: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Pays"
        value={newAddress.country}
        onChangeText={(text) => setNewAddress({ ...newAddress, country: text })}
      />
      <Button title="Ajouter l'adresse" onPress={handleAddAddress} />
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
  addressContainer: {
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ListAdresses;
