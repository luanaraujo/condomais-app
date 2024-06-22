import * as React from "react";
import {
  Button as PaperButton,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";

const CustomDialog = (props) => {
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={() => props.onClose()}>
        <Dialog.Title>{props.titulo}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{props.mensagem}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton onPress={() => props.onClose()}>OK</PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
