import React, { useContext } from "react";
import { Text , StyleSheet, View, Image} from "react-native";
import { IconButton, Modal, TextInput } from "react-native-paper";
import { colors } from "../colors";
import MyContext from "../MyContext";


const ModalSOS = (props) => {
  const { setVisible, visible , selectPlant, setSelectPlant , roleBotaniste} = props;
  const plant = selectPlant;
  const { updatePlantAnswer } = useContext(MyContext);
  const id_plant = plant.id ;

  return (
    <Modal
      visible={visible}
      onDismiss={()=> setVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <View style={styles.CardInfo}>

        <IconButton
          icon="arrow-left-thick"
          iconColor={colors.black}
          size={30}
          onPress={() => {setVisible(false); setSelectPlant(0);}}
          style={styles.buttonBack}
        />

        <View style={styles.plantInfo}>
          <Image source={{ uri: plant.url }} style={styles.PlantImage} />
          <View style={styles.detailInfo}>
            {/* Card avec les infos du gardien qui a demander la request  */}
            <Text style={styles.TextCardDetail}>{plant.pseudo}</Text>
            <Text style={styles.TextCardDetail}>{plant.variety}</Text>
            <Text style={styles.TextCardDetail}>{plant.description}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.Title}> 
        Nos Botanistes vous conseillent :
      </Text>
      
      <View style={ plant.answer ? styles.CardAnswer : {} }>
        <Text   >
          {plant.answer}
        </Text>
      </View>

      <View style={styles.AnswerBar}>
        {/* Input de la réponse du botaniste ( uniquement pour le botaniste ) */}
        <TextInput 
          placeholder="Indiquez votre réponse"
          onSubmitEditing={(answer) => (updatePlantAnswer({ id_plant ,  answer}))}
          disabled={ roleBotaniste }
        
        />
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  CardInfo : {
    position : "absolute",
    top : 0 , 
    backgroundColor : colors.green,
    width : "100%",
    height : "50%",
    maxHeight : 300, 
    borderBottomRightRadius : 15 , 
    borderBottomLeftRadius : 15, 
    // Ombre pour iOS
    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Ombre pour Android
    elevation: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  plantInfo : {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent : "space-around",
    top : "5%",

  },
  PlantImage : {
    position : "relative",
    
    height : 200,
    width : 150 ,
    borderWidth : 1 ,
    borderColor : colors.white,
    borderRadius : 15 , 
  },
  detailInfo : {
    backgroundColor : colors.white , 
    height : 200,
    width : 200 ,
    borderRadius : 15,
    justifyContent : "space-around",
    alignItems: "center",
  },
  TextCardDetail : {
    fontWeight : "bold",
    fontSize : 15,
  },
  buttonBack: {
    position : "relative" ,
    top : 10 ,
    alignItems : "center",
  },
  Title : {
    position : "absolute" ,
    fontSize : 17,
    fontWeight : "bold",
    top : 350,
    left : 10
  },
  CardAnswer : {
    backgroundColor : colors.white,
    padding : 20 ,
    width : "80%",
    borderWidth : 1,
    borderColor : colors.black ,
    borderRadius : 15 , 
    position : "absolute" ,
    top : 400 ,
    left : "10%",
  },
  AnswerBar : {
    position : "absolute",
    width : "80%",
    left : "10%",
    top: 550,
  
  },

});


export default ModalSOS;