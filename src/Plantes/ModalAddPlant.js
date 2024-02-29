import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../colors';
import { Modal } from 'react-native-paper';

const ModalAddPlant = ({ setVisible, visible }) => {
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Icon name="close" onPress={() => setVisible(false)} style={styles.modalCloseIcon} color={'#000000'} size={24} />
        <Text>Example Modal hahaha.  Click outside this area to dismiss.</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.background,
    margin: 30,
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.background,
    margin: 10,
    flex: 1,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: colors.warning,
  },
});

export default ModalAddPlant;