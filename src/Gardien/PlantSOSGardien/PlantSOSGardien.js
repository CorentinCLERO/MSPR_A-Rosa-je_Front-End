/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from "react";
import { Text, View, ScrollView, StyleSheet, TextInput, Alert, Keyboard } from "react-native";
import MyContext from "../../Context/MyContext";
import { colors } from "../../functions/colors";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import CardPhotoContainer from "../../components/CardPhotoContainer/CardPhotoContainer";
import ModalSOS from "../../components/ModalSOS/ModalSOS";

const PlantSOSGardien = () => {
  const [plantData, setPlantData] = useState({});
  const { plantsSOS, addPlantSOS } = useContext(MyContext);
  const [visible, setVisible] = useState(false);
  const [selectPlant , setSelectPlant] = useState(0);
  const roleBotaniste = true;

  const handleAddPlantSOS = () => {
    if (plantData.description === undefined || plantData.variety === undefined || plantData.url === undefined) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }
    addPlantSOS({ ...plantData, id: Math.floor(Math.random() * 1000000), status: "slot", treated: false, answer: null });
    Keyboard.dismiss();
    setPlantData({});
  };

  const pickImageOrTakePhoto = () => {
    Alert.alert("Ajouter une image", "Choisissez une option", [
      {
        text: "Caméra",
        onPress: takePhoto,
      },
      {
        text: "Galerie",
        onPress: pickImage,
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Erreur", "Permission pour accéder à la caméra est requise.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPlantData({ ...plantData, url: result.assets[0].uri });
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPlantData({ ...plantData, url: result.assets[0].uri });
    }
  };

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={styles.title}>PlantSOS</Text>
      <View style={{ margin: 20, backgroundColor: colors.primary, padding: 20, borderRadius: 10, gap: 5 , maxHeight:"55%"}}>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>Vous avez un problème avec une plante ?</Text>
        <Text style={{ fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>Demandez conseil à nos botanistes expert !</Text>
        <Text style={{ marginBottom: 5 }}>Quel est le nom de la plante ?</Text>
        <TextInput
          value={plantData.variety ? plantData.variety : ""}
          onChangeText={variety => setPlantData({ ...plantData, variety })}
          style={styles.input}
        />
        <Text style={{ marginTop: 5 }}>Quel est le problème de la plante ?</Text>
        <TextInput
          value={plantData.description ? plantData.description : ""}
          onChangeText={description => setPlantData({ ...plantData, description })}
          multiline
          numberOfLines={3}
          style={styles.input}
        />
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginLeft: 10 }}>
          <Button labelStyle={{ marginTop: "17%", borderWidth: 1, borderRadius: 20, color: colors.black, fontSize: 15, paddingHorizontal: "5%", backgroundColor: colors.white , maxHeight:"100%"}} onPress={() => handleAddPlantSOS()}>
            <Text>Poster</Text>
          </Button>
          <Button
            labelStyle={{marginTop: "11.5%", borderWidth: 1, borderRadius: 20, color: colors.black, fontSize: 15, paddingHorizontal: "5%", backgroundColor: colors.white , maxHeight:"100%"}}
            onPress={() => pickImageOrTakePhoto()}
          >
            <Text>Ajout d&apos;image</Text>
          </Button>
        </View>
      </View>
      <ScrollView>
        {
          plantsSOS?.map((plantSOS, index) => {
            return (
              <CardPhotoContainer
                key={index} plants={[plantSOS]}
                onPress={() => {setVisible(true) ; setSelectPlant(plantSOS) ; }}
                cardStyles={[styles.card, index === plantsSOS.length - 1 ? styles.lastCard : {}]}
                imageHeight={13}
                imageWidth={28}
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
      <ModalSOS {...{ setVisible, visible , selectPlant , setSelectPlant , roleBotaniste }} />
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
    backgroundColor: colors.white,
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