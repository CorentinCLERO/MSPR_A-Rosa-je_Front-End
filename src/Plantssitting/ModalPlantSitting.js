import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../colors';
import { Button, Checkbox, Modal, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

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
          size={24}
        />
        <View style={styles.modalContent}>
          <Text>Ajout de plant-sitting :</Text>
          <TextInput
            label="Variété"
            value={plantData.variety ? plantData.variety : ''}
            onChangeText={variety => setPlantData({ ...plantData, variety })}
            multiline
          />
          <View style={styles.checkboxContainer}>
            <Text>Déplaçable ?</Text>
            <Checkbox
              status={plantData.movable ? 'checked' : 'unchecked'}
              onPress={() => setPlantData({ ...plantData, movable: !plantData.movable })}
            />
          </View>
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
  imageContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: colors.warning,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ModalPlantSitting;