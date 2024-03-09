import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { colors } from "../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";
import ModalPlantSitting from "./ModalPlantSitting";

const Plantsitting = (props) => {
  const { plantSittingList, deletePlantSitting } = props;
  const [visible, setVisible] = useState(false);
  const [PlantSittingWaiting, setPlantSittingWaiting] = useState([]);
  const [PlantSittingKeep, setPlantSittingKeep] = useState([]);

  useEffect(()=> {
    setPlantSittingWaiting(plantSittingList.filter(plantSitting => plantSitting.status === "En cours"));
    setPlantSittingKeep(plantSittingList.filter(plantSitting => plantSitting.status === "En attente"));
  }, [plantSittingList]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos Demandes de Plant-Sitting</Text>
      <View style={styles.containerPlant}>
        <Text style={styles.titlePlant}>Vos Plant-Sitting en cours :</Text>
        <ScrollView style={styles.containerPlantScroll}>
          {PlantSittingWaiting.map(plantSitting => (
            <Card key={plantSitting.id} style={styles.card} >
              <View style={styles.cardLayout}>
                <Card.Cover style={styles.cardImage} source={{ uri: plantSitting.plants[0]?.url }} />
                <Card.Content style={styles.cardContent}>
                  <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.reason}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.description}</Text>
                  <Text style={styles.text}>{plantSitting.plants.length + " plantes"}</Text>
                  <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{format(plantSitting.beginDate, "MM/dd/yy") + " - " + format(plantSitting.endDate, "MM/dd/yy")}</Text>
                  <View style={styles.bottomContainer}>
                    <Text style={[styles.text, styles.text2]}>{plantSitting.status}</Text>
                    <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => deletePlantSitting(plantSitting.id)}>
                      <Icon name="delete" color={"#ff5555"} size={24} />
                    </Button>
                  </View>
                </Card.Content>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
      <View style={styles.containerPlant}>
        <Text style={[styles.titlePlant, styles.titlePlant2]}>Vos demandes de Plant-Sitting :</Text>
        <ScrollView style={styles.containerPlantScroll}>
          {PlantSittingKeep.map((plantSitting, index) => (
            <Card
              key={plantSitting.id}
              style={[
                styles.card,
                index === PlantSittingKeep.length - 1 ? styles.lastCard : {}
              ]}
            >
              <View style={styles.cardLayout}>
                <Card.Cover style={styles.cardImage} source={{ uri: plantSitting.plants[0]?.url }} />
                <Card.Content style={styles.cardContent}>
                  <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.reason}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting.description}</Text>
                  <Text style={styles.text}>{plantSitting.plants.length + " plantes"}</Text>
                  <Text style={styles.text}>{format(plantSitting.beginDate, "MM/dd/yy") + " - " + format(plantSitting.endDate, "MM/dd/yy")}</Text>
                  <View style={styles.bottomContainer}>
                    <Text style={[styles.text, styles.text2]}>{plantSitting.status}</Text>
                    <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => deletePlantSitting(plantSitting.id)}>
                      <Icon name="delete" color={"#ff5555"} size={24} />
                    </Button>
                  </View>
                </Card.Content>
              </View>
            </Card>
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
      <ModalPlantSitting {...props} {...{ setVisible, visible }} />
    </View>
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
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  lastCard: {
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
  cardLayout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 15,
    // Ombre pour iOS
    shadowColor: colors.success,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Ombre pour Android
    elevation: 15,
  },
  cardImage: {
    flex: 4,
    height: "auto",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
  },
  cardContent: {
    flex: 6,
    paddingLeft: 10,
    gap: 10,
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