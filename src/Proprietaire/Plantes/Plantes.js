import React, { useRef, useState, useContext } from "react";
import { Text, View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Button, Dialog, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalPlant from "./ModalPlant";
import MyContext from "../../Context/MyContext";
import CardPhotoContainer from "../../components/CardPhotoContainer/CardPhotoContainer";
import { colors } from "../../functions/colors";

const Plantes = () => {
  const { plants, removePlant } = useContext(MyContext);
  const [canScroll, setCanScroll] = useState(false);
  const [haveScroll, setHaveScroll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const scrollViewRef = useRef(null);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    const scrollViewHeight = Dimensions.get("window").height - 40;
    if (contentHeight > scrollViewHeight) {
      setCanScroll(true);
    } else {
      setCanScroll(false);
    }
  };

  const showConfirmDialog = (plantId) => {
    setSelectedPlantId(plantId);
    setConfirmVisible(true);
  };

  const handleDelete = () => {
    removePlant(selectedPlantId);
    setConfirmVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos plantes :</Text>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(w, h) => handleContentSizeChange(w, h)}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y) {
            setHaveScroll(true);
          } else {
            setHaveScroll(false);
          }
        }}
      >
        {
          plants?.map((plant, index) => {
            return (
              <CardPhotoContainer
                key={index} plants={[plant?.picture]}
                cardStyles={index === plants.length - 1 ? styles.lastCard : {}}
                cardContentStyles={styles.cardContent}
                imageWidth={28}
                imageHeight={23}
              >
                <Text style={styles.cardtitle}>{plant.variety}</Text>
                <Text style={styles.content}>{plant.movable ? "Déplaçable" : "Non déplaçable"}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail">{plant?.picture?.message ? plant?.picture?.message : "Aucune description"}</Text>
                <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => showConfirmDialog(plant.id)}>
                  <Icon name="delete" color={"#ff5555"} size={24} />
                </Button>
              </CardPhotoContainer>
            );
          })
        }
      </ScrollView>
      {canScroll && (
        <Icon
          name={haveScroll ? "arrow-up" : "arrow-down"}
          size={24}
          color="#000"
          style={styles.scrollIcon}
          onPress={() => {
            if (haveScroll) scrollViewRef.current.scrollTo({ animated: true });
            else scrollViewRef.current.scrollToEnd({ animated: true });
          }} />
      )}
      <Button style={styles.addButton} mode="contained" onPress={() => setVisible(true)} buttonColor="#D9D9D9" rippleColor={"#00000040"}>
        <Icon name="plus" color={"#000000"} size={24} />
      </Button>
      <ModalPlant {...{ setVisible, visible }} />
      <Dialog visible={confirmVisible} onDismiss={() => setConfirmVisible(false)}>
        <Dialog.Title>
          <Text>Confirmation</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph><Text>Êtes-vous sûr de vouloir supprimer cette plante ?</Text></Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setConfirmVisible(false)}><Text>Annuler</Text></Button>
          <Button onPress={handleDelete}><Text>Supprimer</Text></Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: colors.background,
  },
  title: {
    marginVertical: 20,
    fontSize: 26,
    fontWeight: "bold",
  },
  lastCard: {
    marginBottom: 100,
  },
  cardtitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
  },
  deleteButton: {
    width: "100%",
    alignItems: "flex-end",
  },
  scrollIcon: {
    position: "absolute",
    bottom: 20,
    left: 30,
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.black,
  },
  addButton: {
    width: 80,
    position: "absolute",
    bottom: 20,
    right: "50%",
    transform: [{ translateX: 20 }],
    borderWidth: 1,
    borderColor: colors.black,
  },
  cardContent: {
    gap: 5
  }
});

export default Plantes;