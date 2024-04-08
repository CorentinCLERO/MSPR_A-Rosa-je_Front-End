import React, { useEffect, useState, useContext } from "react";
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../functions/colors";
import { Button, Checkbox, Modal, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import MyContext from "../../Context/MyContext";

const ModalPlant = (props) => {
  const { setVisible, visible } = props;
  const { addPlant } = useContext(MyContext);
  const [plantData, setPlantData] = useState({});
  const [imageInfo, setImageInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (visible) {
      setPlantData({});
    }
  }, [visible]);

  const handleAddPlant = () => {
    if (plantData.url === undefined || plantData.variety === undefined || plantData.message === undefined) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis et ajouter une image.");
      return;
    }
    const data = new FormData();
    // Ajouter l'image à l'objet FormData
    data.append("photo", {
      name: imageInfo.name,
      type: imageInfo.type,
      uri: imageInfo.uri,
    });
    // Ajouter les autres données du formulaire à l'objet FormData
    Object.keys(plantData).forEach(key => {
      data.append(key, plantData[key]);
    });
    // Ajout d'infos qui ne sont pas géré pour la version de POC
    data.append("userId", 1);
    data.append("adress_id", 1);
    setIsFetching(true);
    addPlant(data)
      .then(response => {
        console.log("Réponse du serveur:", response);
        setVisible(false);
        setIsFetching(false);
      }).catch(error => {
        console.error("Erreur lors de l'ajout de la plante:", error);
        setIsFetching(false);
        Alert.alert("Erreur", "Nous n'avons pas réussi à enregistrer votre plante, veuillez réessayer plus tard.");
      });
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
      createFormData(result.assets[0].uri);
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
      createFormData(result.assets[0].uri);
      setPlantData({ ...plantData, url: result.assets[0].uri });
    }
  };

  const createFormData = (photoUri) => {
    console.log("photoUri", photoUri);
    // Ici, "photo" est le nom du champ attendu par votre back-end/api Cloudinary.
    setImageInfo({
      name: `coco_${Date.now()}.jpg`, // Vous pouvez donner un nom dynamique basé sur l"heure actuelle pour éviter les doublons.
      type: "image/jpeg", // Assurez-vous que le type correspond au type de fichier que vous envoyez.
      uri: Platform.OS === "ios" ? photoUri.replace("file://", "") : photoUri,
    });
  };

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <ScrollView>
        <Icon
          name="close"
          onPress={() => setVisible(false)}
          style={styles.modalCloseIcon}
          color={"#000000"}
          size={40}
        />
        <View style={styles.modalContent}>
          <Text>Ajout de plant :</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImageOrTakePhoto}>
            <Image source={{ uri: plantData.url ? plantData.url : "https://res.cloudinary.com/dl0ehqnva/image/upload/c_thumb,h_800,w_800/co_rgb:1E2C3F,l_text:helvetica_50_bold_normal_left:Ajout%C3%A9%20une%20image/fl_layer_apply,g_south,y_30/msprb3cda/hahf85nbcakp5no5vwjv.jpg" }} style={styles.image} />
          </TouchableOpacity>
          <TextInput
            label="Variété"
            value={plantData.variety ? plantData.variety : ""}
            onChangeText={variety => setPlantData({ ...plantData, variety })}
          />
          <TextInput
            label="Message"
            value={plantData.message ? plantData.message : ""}
            onChangeText={message => setPlantData({ ...plantData, message })}
            multiline
          />
          <View style={styles.checkboxContainer}>
            <Text>Déplaçable ?</Text>
            <Checkbox
              status={plantData.movable === undefined ? "checked" : plantData.movable ? "checked" : "unchecked"}
              onPress={() => setPlantData({ ...plantData, movable: !plantData.movable })}
            />
          </View>
          <Button
            onPress={() => {
              if (!isFetching) {
                handleAddPlant();
              }
            }}
            buttonColor={colors.success}
            textColor={colors.black}
            loading={isFetching}
          >
            <Text style={styles.whiteText}>
              {!isFetching && "Add Plant"}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.background,
    margin: 30,
    flex: 1,
    borderRadius: 10,
  },
  modalContent: {
    margin: 20,
    flex: 1,
    gap: 40,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200
  },
  modalCloseIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    color: colors.warning,
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  whiteText: {
    color: colors.white
  },
});

export default ModalPlant;