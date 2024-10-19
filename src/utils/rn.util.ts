import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export const RnUtils = {
  toast: (title: string, description: string, type: ALERT_TYPE) => {
    Toast.show({ type, title, textBody: description });
  },
};
