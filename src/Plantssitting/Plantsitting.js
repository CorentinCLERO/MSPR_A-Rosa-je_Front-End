import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";
import ModalPlantSitting from "./ModalPlantSitting";
import MyContext from "../MyContext";
import CardPhotoContainer from "../components/CardPhotoContainer/CardPhotoContainer";

const Plantsitting = () => {
  const { plantSittings, removePlantSitting } = useContext(MyContext);

  const [visible, setVisible] = useState(false);
  const PlantSittingWaiting = plantSittings.filter(plantSitting => plantSitting.status === "En cours");
  const PlantSittingKeep = plantSittings.filter(plantSitting => plantSitting.status === "En attente");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos Demandes de Plant-Sitting</Text>
      <View style={styles.containerPlant}>
        <Text style={styles.titlePlant}>Vos Plant-Sitting en cours :</Text>
        <ScrollView style={styles.containerPlantScroll}>
          {PlantSittingWaiting.map((plantSitting, index) => (
            <CardPhotoContainer
              key={index} plants={plantSitting.plants}
              cardStyles={index === PlantSittingWaiting.length - 1 ? styles.lastCard : {}}
              pagination={plantSitting.plants.length > 1}
            >
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.reason}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.description}</Text>
              <Text style={styles.text}>{plantSitting.plants.length + " plantes"}</Text>
              <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{format(plantSitting.beginDate, "dd/MM/yy") + " - " + format(plantSitting.endDate, "dd/MM/yy")}</Text>
              <View style={styles.bottomContainer}>
                <Text style={[styles.text, styles.text2]}>{plantSitting.status}</Text>
                <Button
                  style={styles.deleteButton}
                  rippleColor={"#f00"}
                  onPress={() => removePlantSitting(plantSitting.id)}
                >
                  <Icon name="delete" color={"#ff5555"} size={24} />
                </Button>
              </View>
            </CardPhotoContainer>
          ))}

        </ScrollView>
      </View>
      <View style={styles.containerPlant}>
        <Text style={[styles.titlePlant, styles.titlePlant2]}>Vos demandes de Plant-Sitting :</Text>
        <ScrollView style={styles.containerPlantScroll}>
          {PlantSittingKeep.map((plantSitting, index) => (
            <CardPhotoContainer
              key={index}
              plants={plantSitting.plants}
              cardStyles={index === PlantSittingKeep.length - 1 ? styles.lastCard2 : {}}
              pagination={plantSitting.plants.length > 1}
            >
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.reason}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.description}</Text>
              <Text style={styles.text}>{plantSitting.plants.length + " plantes"}</Text>
              <Text style={styles.text}>{format(plantSitting.beginDate, "MM/dd/yy") + " - " + format(plantSitting.endDate, "MM/dd/yy")}</Text>
              <View style={styles.bottomContainer}>
                <Text style={[styles.text, styles.text2]}>{plantSitting.status}</Text>
                <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => removePlantSitting(plantSitting.id)}>
                  <Icon name="delete" color={"#ff5555"} size={24} />
                </Button>
              </View>
            </CardPhotoContainer>
          ))}
        </ScrollView>
        <Button
          style={styles.addButton}
          mode="contained"
          onPress={() => setVisible(true)}
          buttonColor="#D9D9D9"
          rippleColor={"#00000040"}
        >
          <Icon name="plus" color={"#000000"} size={24} />
        </Button>
      </View>
      <ModalPlantSitting {...{ setVisible, visible }} />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    margin: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  containerPlant: {
    height: "50%",
  },
  containerPlantScroll: {
    paddingHorizontal: 10,
  },
  lastCard: {
    marginBottom: 20,
  },
  lastCard2: {
    marginBottom: 130,
  },
  titlePlant: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  titlePlant2: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -10,
  },
  deleteButton: {
    width: "100%",
    alignItems: "center",
    marginLeft: -10,
  },
  text: {
    textAlign: "center"
  },
  text2: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: -10,
    borderRadius: 10,
  },
  addButton: {
    width: 80,
    position: "absolute",
    bottom: 60,
    right: "50%",
    transform: [{ translateX: 40 }],
    borderWidth: 1,
    borderColor: colors.black,
  },
});

export default Plantsitting;