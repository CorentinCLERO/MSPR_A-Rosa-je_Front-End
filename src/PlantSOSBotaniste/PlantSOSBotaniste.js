import React, { useContext, useEffect, useState } from "react";
import { Text , StyleSheet, View, FlatList} from "react-native";
import { Searchbar} from "react-native-paper";
import ModalSOS from "./ModalSOS";
import MyContext from "../MyContext";
import CardPhotoContainer from "../components/CardPhotoContainer/CardPhotoContainer";
import { colors } from "../colors";


const PlantSOS = () => {
  const {plantsSOS } = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const filteredPlants = plantsSOS.filter(plantsSOS =>
      plantsSOS.variety.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlants(filteredPlants);
  }, [searchQuery, plantsSOS]);

  return (
    <View>

      <Text style={styles.header}>PlantSOS</Text>
      <Searchbar
        placeholder="Rechercher une plante"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      
      <FlatList data={filteredPlants} renderItem={({item, index}) => (

        <CardPhotoContainer
          plants={[item]} key={index} 
          // onPress={() => setVisible(true)}
          cardStyles={[styles.card, index === plantsSOS.length - 1 ? styles.lastCard : {}]}
          imageHeight={19}
          imageWidth={28}
        >

          <View style={styles.content}>
            <Text>{item.pseudo}</Text>
            <Text>{item.variety}</Text>
            <Text>{item.description}</Text>          
            <Text style={styles.cardTreated}>{item.treated ? "En cours" : "Terminer"}</Text>       
          </View>  
        </CardPhotoContainer> )}
      />
        
           
      
      <ModalSOS {...{ setVisible, visible }} />
    </View>
    

  );
};


const styles = StyleSheet.create({
  header : {
    position : "relative",
    left : 142 ,
    marginBottom : 20 ,
    fontSize : 27 , 
    fontWeight : "bold"
  },
  search : {
    position : "relative",
    left : 20 , 
    width : 370,
    marginBottom : 20 ,
  },
  card: {
    marginVertical: 20, 
    marginHorizontal: 40
  },
  lastCard: {
    marginBottom: 220,
  },
  cardTreated: {
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    width : 75,
    paddingLeft : 10
  },
  


});

export default PlantSOS;