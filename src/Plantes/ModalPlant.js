import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../colors";
import { Button, Checkbox, Modal, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const ModalPlant = (props) => {
  const { setVisible, visible, addPlant } = props;
  const initialState = {
    url: null,
    variety: null,
    movable: false,
  };
  const [plantData, setPlantData] = useState(initialState);

  useEffect(() => {
    if (visible) {
      setPlantData(initialState);
    }
  }, [visible]);

  const handleAddPlant = () => {
    if (plantData.url === null || plantData.variety === null) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }
    setVisible(false);
    addPlant({ ...plantData, id: Math.floor(Math.random() * 1000000) });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPlantData({ ...plantData, url: result.assets[0].uri });
    }
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
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
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
              status={plantData.movable ? "checked" : "unchecked"}
              onPress={() => setPlantData({ ...plantData, movable: !plantData.movable })}
            />
          </View>
          <Button
            onPress={() => handleAddPlant()}
            buttonColor={colors.success}
            textColor={colors.black}
          >
            <Text>
              Add Plant
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
});

export default ModalPlant;