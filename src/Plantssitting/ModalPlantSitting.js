import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../colors';
import { Button, Modal, TextInput } from 'react-native-paper';

const ModalPlantSitting = (props) => {
  const { setVisible, visible, addPlantSitting } = props;
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

  const handleAddPlantSitting = () => {
    if (plantData.url === null || plantData.variety === null) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs requis.');
      return;
    }
    setVisible(false);
    addPlantSitting({ ...plantData, id: Math.floor(Math.random() * 1000000) });
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
          color={'#000000'}
          size={40}
        />
        <View style={styles.modalContent}>
          <Text>Demande de plant-sitting :</Text>
          <TextInput
            label="Indiquez la description de vos plantes :"
            value={plantData.description ? plantData.description : ''}
            onChangeText={description => setPlantData({ ...plantData, description })}
            multiline
          />
          <TextInput
            label="Indiquez la raison de votre demande :"
            value={plantData.variety ? plantData.variety : ''}
            onChangeText={variety => setPlantData({ ...plantData, variety })}
            multiline
          />
          <Button
            onPress={() => handleAddPlantSitting()}
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
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: colors.warning,
  },
});

export default ModalPlantSitting;