/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from "react";
import { Text, View, ScrollView, StyleSheet, TextInput } from "react-native";
import MyContext from "../MyContext";
import CardPhotoContainer from "../components/CardPhotoContainer/CardPhotoContainer";
import { colors } from "../colors";

const PlantSOSGardien = () => {
  const [plantData, setPlantData] = useState({});
  const { plantsSOS, addPlantSOS } = useContext(MyContext);

  return (
    <View>
      <Text style={styles.title}>PlantSOS</Text>
      <View style={{ margin: 20, backgroundColor: colors.primary, padding: 20, borderRadius: 10, gap: 5 }}>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>Vous avez un problème avec une plante ?</Text>
        <Text style={{ fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>Demandez conseil à nos botanistes expert !</Text>
        <Text style={{ marginBottom: 5 }}>Quel est le nom de la plante ?</Text>
        <TextInput
          value={plantData.title ? plantData.title : ""}
          onChangeText={title => setPlantData({ ...plantData, title })}
          style={styles.input}
        />
        <Text style={{ marginTop: 5 }}>Quel est le problème de la plante ?</Text>
        <TextInput
          value={plantData.description ? plantData.description : ""}
          onChangeText={description => setPlantData({ ...plantData, description })}
          multiline
          numberOfLines={4}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {
          plantsSOS?.map((plantSOS, index) => {
            return (
              <CardPhotoContainer
                key={index} plants={[plantSOS]}
                cardStyles={[styles.card, index === plantsSOS.length - 1 ? styles.lastCard : {}]}
                imageHeight={13}
              >
                <View style={styles.cardTitle}>
                  <Text>{plantSOS.variety}</Text>
                  <Text style={styles.cardTreated}>{plantSOS.treated ? "Traitée" : "Non traitée"}</Text>
                </View>
                <Text numberOfLines={2} ellipsizeMode="tail">{plantSOS.description}</Text>
              </CardPhotoContainer>
            );
          })
        }
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10, 
    textAlign: "center", 
    marginVertical: 20 
  },
  input: { 
    borderWidth: 1, 
    borderRadius: 5, 
    padding: 5, 
    marginHorizontal: 20 
  },
  card: {
    marginVertical: 20, 
    marginHorizontal: 40
  },
  lastCard: {
    marginBottom: 420,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  cardTreated: {
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
});

export default PlantSOSGardien;