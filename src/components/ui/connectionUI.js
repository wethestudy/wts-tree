import { parameters } from "../../database/parameters";

export const connectionUI = {
  connectionProperties: parameters.connectionProperties,
  defColor: () => {
    return connectionUI.connectionProperties.defaultColor;
  },
  defOpacity: (d) => {
    return connectionUI.connectionProperties.defaultOpacity;
  }
};
