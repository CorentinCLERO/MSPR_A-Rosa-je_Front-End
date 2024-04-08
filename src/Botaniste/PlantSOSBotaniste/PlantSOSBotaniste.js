import React, { useContext, useEffect, useState } from "react";
import { Text , StyleSheet, View, FlatList} from "react-native";
import { Searchbar} from "react-native-paper";
import ModalSOS from "../../components/ModalSOS/ModalSOS";
import MyContext from "../../Context/MyContext";
import { colors } from "../../functions/colors";
import CardPhotoContainer from "../../components/CardPhotoContainer/CardPhotoContainer";


const PlantSOS = () => {
  const {plantsSOS } = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectPlant , setSelectPlant] = useState(0);
  const roleBotaniste  = false;


  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const filteredPlants = plantsSOS.filter(plantsSOS =>
      plantsSOS.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlants(filteredPlants);
  }, [searchQuery, plantsSOS]);

  return (
    <View style={{ backgroundColor : colors.background }}>

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
          onPress={() => {setVisible(true) ; setSelectPlant(item) ; }}
          cardStyles={[styles.card, index === plantsSOS.length - 1 ? styles.lastCard : {}]}
          imageHeight={19}
          imageWidth={28}
        >

          <View style={styles.content}>
            <Text style={styles.text}>{item.pseudo}</Text>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>          
            <Text style={styles.cardTreated}>{item.treated ? "Répondu" : "mission"}</Text>       
          </View>  
        </CardPhotoContainer> )}
      />
        
           
      
      <ModalSOS {...{ setVisible, visible , selectPlant , setSelectPlant , roleBotaniste }} />
    </View>
    

  );
};


const styles = StyleSheet.create({
  header : {
    marginBottom : 20 ,
    fontSize : 27 , 
    marginTop : 15,
    left: "35%",
    fontWeight : "bold",
    width : "100%",
  },
  search : {
    position : "relative",
    left : 20 , 
    width : "90%",
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
    width : "58%",
    paddingLeft : "10%",
    marginTop : 5 ,
  },
  text : {
    marginTop : 5 ,
  }
  


});

export default PlantSOS;