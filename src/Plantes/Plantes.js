import React, { useRef, useState, useContext } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalPlant from "./ModalPlant";
import { styles } from "./PlantsStyle";
import MyContext from "../MyContext";
import CardPhotoContainer from "../components/CardPhotoContainer/CardPhotoContainer";

const Plantes = () => {
  const [canScroll, setCanScroll] = useState(false);
  const [haveScroll, setHaveScroll] = useState(false);
  const [visible, setVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const { plants, removePlant } = useContext(MyContext);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    const scrollViewHeight = Dimensions.get("window").height - 40;
    if (contentHeight > scrollViewHeight) {
      setCanScroll(true);
    } else {
      setCanScroll(false);
    }
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
          plants.map((plant, index) => {
            return (
              <CardPhotoContainer
                key={index} plants={[plant]}
                cardStyles={index === plants.length - 1 ? styles.lastCard : {}}
                cardContentStyles={styles.cardContent}
                imageWidth={28}
              >
                <Text style={styles.cardtitle}>{plant.variety}</Text>
                <Text style={styles.content}>{plant.movable ? "Déplaçable" : "Non déplaçable"}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail">{plant.message}</Text>
                <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => removePlant(plant.id)}>
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
    </View>
  );
};

export default Plantes;

