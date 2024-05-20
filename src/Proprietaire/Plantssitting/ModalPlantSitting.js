import React, { useEffect, useState, useContext } from "react";
import { Alert, ScrollView, StyleSheet, Text, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../functions/colors";
import { Button, Modal, TextInput } from "react-native-paper";
import DropdownSelect from "react-native-input-select";
import MyContext from "../../Context/MyContext";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const ModalPlantSitting = (props) => {
  const { setVisible, visible } = props;
  const { plants, addPlantSitting, addresses } = useContext(MyContext);
  const [plantData, setPlantData] = useState({});
  const [showBeginDatePicker, setShowBeginDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const minDate = new Date();

  useEffect(() => {
    if (visible) {
      setPlantData({});
    }
  }, [visible]);

  const handleAddPlantSitting = () => {
    if (
      plantData.description === undefined ||
      plantData.reason === undefined ||
      plantData.plants === undefined ||
      plantData.begin_date === undefined ||
      plantData.end_date === undefined ||
      plantData.adress === undefined
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }
    addPlantSitting({ ...plantData })
      .then(() => setVisible(false))
      .catch((err) => console.log("Erreur lors de l'ajout de la requête", err));
  };

  const onDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || (type === "begin" ? plantData.begin_date : plantData.end_date);
    if (type === "begin") {
      setShowBeginDatePicker(Platform.OS === "ios");
      setPlantData({ ...plantData, begin_date: currentDate });
    } else {
      setShowEndDatePicker(Platform.OS === "ios");
      setPlantData({ ...plantData, end_date: currentDate });
    }
  };

  const plantsWithNoPlantSitting = plants ? plants.filter((plant) => plant.request_id === null) : [];

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <ScrollView>
        <View style={styles.modalContent}>
          <Text>Demande de plant-sitting :</Text>
          <View style={styles.modalCalendar}>
            <View style={styles.datePickerContainer}>
              <Button onPress={() => setShowBeginDatePicker(true)}>{plantData?.begin_date ? plantData.begin_date.toLocaleDateString() : "Sélectionner la date de début"}</Button>
              {showBeginDatePicker && (
                <RNDateTimePicker
                  value={plantData.begin_date || new Date()}
                  mode="date"
                  display="default"
                  minimumDate={minDate}
                  onChange={(event, date) => onDateChange(event, date, "begin")}
                />
              )}
            </View>
            <View style={styles.datePickerContainer}>
              <Button onPress={() => setShowEndDatePicker(true)}>{plantData?.end_date ? plantData.end_date.toLocaleDateString() : "Sélectionner la date de fin"}</Button>
              {showEndDatePicker && (
                <RNDateTimePicker
                  value={plantData.end_date || new Date()}
                  mode="date"
                  display="default"
                  minimumDate={minDate}
                  onChange={(event, date) => onDateChange(event, date, "end")}
                />
              )}
            </View>
            <DropdownSelect
              placeholder="Plantes à garder"
              options={plantsWithNoPlantSitting?.map((plant) => ({
                label: plant.variety,
                value: plant,
              }))}
              selectedValue={plantData.plants || null}
              onValueChange={(itemValue) => setPlantData({ ...plantData, plants: itemValue })}
              isMultiple
              isSearchable
              modalControls={{ modalOptionsContainerStyle: { paddingBottom: 20 } }}
            />
            <DropdownSelect
              placeholder="Adresse des plantes"
              options={addresses?.map((address) => ({
                label: address.number + " " + address.street + " " + address.city,
                value: address,
              }))}
              selectedValue={plantData.adress || null}
              onValueChange={(itemValue) => setPlantData({ ...plantData, adress: itemValue })}
              isSearchable
              modalControls={{ modalOptionsContainerStyle: { paddingBottom: 20 } }}
            />
            <TextInput
              label="Description de vos plantes :"
              value={plantData.description || ""}
              onChangeText={(description) => setPlantData({ ...plantData, description })}
              multiline
            />
            <TextInput
              label="Raison de votre demande :"
              value={plantData.reason || ""}
              onChangeText={(reason) => setPlantData({ ...plantData, reason })}
              multiline
            />
            <Button
              onPress={handleAddPlantSitting}
              buttonColor={colors.success}
              textColor={colors.black}
            >
              <Text>Ajouter</Text>
            </Button>
          </View>
          <Icon
            name="close"
            onPress={() => setVisible(false)}
            style={styles.modalCloseIcon}
            color={"#000000"}
            size={40}
          />
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
  modalCalendar: {
    marginHorizontal: 20,
    flex: 1,
  },
  datePickerContainer: {
    marginVertical: 20,
  },
  modalContent: {
    margin: 20,
    flex: 1,
    gap: 40,
  },
  modalCloseIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    color: colors.warning,
  },
});

export default ModalPlantSitting;
