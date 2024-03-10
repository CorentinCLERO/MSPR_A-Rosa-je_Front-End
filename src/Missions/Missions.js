import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { colors } from "../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";

const Mission = (props) => {
  const { missions, deleteMission } = props;
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center", marginVertical: 20 }}>Mes gardes :</Text>
      <ScrollView style={{ marginBottom: 80 }}>
        {missions.map((mission, index) => (
          <Card key={index} style={styles.card} >
            <View style={styles.cardLayout}>
              <Card.Cover style={styles.cardImage} source={{ uri: mission.plants[0]?.url }} />
              <Card.Content style={styles.cardContent}>
                <View style={styles.bottomContainer}>
                  <Text numberOfLines={1} ellipsizeMode="tail">{mission.pseudo}</Text>
                  <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => deleteMission(mission)}>
                    <Icon name="delete" color={"#ff5555"} size={24} />
                  </Button>
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail">{mission.adress.number + " " + mission.adress.street + " " + mission.adress.city}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail">{mission.reason}</Text>
                <Text style={styles.text}>{format(mission.beginDate, "MM/dd/yy") + " - " + format(mission.endDate, "MM/dd/yy")}</Text>
                <Text style={[styles.text, styles.text2]}>{mission.status}</Text>
              </Card.Content>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 40,
    marginVertical: 20,
    borderWidth: 1,
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
    elevation: 8,
  },
  cardImage: {
    flex: 4,
    height: "auto",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 1,
  },
  cardContent: {
    flex: 6,
    paddingLeft: 10,
    gap: 10,
    marginVertical: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -10,
  },
  deleteButton: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    marginLeft: 90,
  },
  text: {
    textAlign: "center"
  },
  text2: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

export default Mission;