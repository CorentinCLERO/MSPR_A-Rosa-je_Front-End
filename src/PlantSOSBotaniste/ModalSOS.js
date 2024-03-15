import React from "react";
import { Text , StyleSheet} from "react-native";
import { Button, Icon, Modal } from "react-native-paper";
import { colors } from "../colors";


const ModalSOS = (props) => {
  const { setVisible, visible } = props;




  return (
    <Modal
      visible={visible}
      onDismiss={()=> setVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <Button
        onPress={() => setVisible(false)}
        icon={"arrow-left-thick"}
      >
      </Button>
      <Text>
        ModalSOS
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
});


export default ModalSOS;