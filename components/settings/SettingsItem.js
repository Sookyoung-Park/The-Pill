import { Text, View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../config/theme";
import StyledText from "../texts/StyledText";

//receives font size and weight as input

const SettingsItem = ({ children, label }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <View
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.settingsItem,
      ]}
    >
      <StyledText style={[{ color: activeColors.Text }, styles.label]}>
        {label}
      </StyledText>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
  },
});

export default SettingsItem;
