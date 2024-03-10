import React from "react";
import { Text } from "react-native";
import { Modal } from "react-native-paper";
import { colors } from "../colors";


const ModalSOS = (props) => {
  const { setVisible, visible } = props;




  return (
    <Modal
      visible={visible}
      onDismiss={()=> setVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <Text>
        ModalSOS
      </Text>
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
});


export default ModalSOS;