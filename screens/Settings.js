import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Appearance,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import StyledText from "../components/texts/StyledText";
import SettingsItem from "../components/settings/SettingsItem";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  //here we set the state of the switch to the current theme
  //theme.mode is the current theme which we get from the context
  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === "dark");

  //here we toggle the theme and update the state of the switch
  const toggleTheme = () => {
    updateTheme();
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    //here we listen for the color scheme change and update the state of the switch
    //this is necessary so that the switch automatically updates
    //when the user changes the theme from the settings
    Appearance.addChangeListener(({ colorScheme }) => {
      colorScheme === "dark" ? setIsDarkTheme(true) : setIsDarkTheme(false);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <StyledText style={{ color: activeColors.accent }} bold>
        Contraception
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Name">
          <StyledText>Maro</StyledText>
          <StyledText>Maro</StyledText>
          <StyledText>Maro</StyledText>
        </SettingsItem>
      </View>

      <StyledText style={{ color: activeColors.accent }} bold>
        Days
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Active Pills">
          <StyledText>21 days</StyledText>
        </SettingsItem>
        <SettingsItem label="Do you take Placebo/Sugar Pills?">
          <StyledText>No</StyledText>
        </SettingsItem>
        <SettingsItem label="Placeo/sugar Pills">
          <StyledText>7 days</StyledText>
        </SettingsItem>
        <SettingsItem label="Start Date">
          <StyledText>October 31th, 2024</StyledText>
        </SettingsItem>
      </View>



      <StyledText style={{ color: activeColors.accent }} bold>
        Reminder
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Push Notification Reminder">
          <StyledText>Yes</StyledText>
        </SettingsItem>
        <SettingsItem label="Reminder Time">
          <StyledText>2:30pm</StyledText>
        </SettingsItem>
      </View>
      
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <SettingsItem>
            <Ionicons name="log-out-outline" size={24} color="red" />
            <StyledText style={{ color: "red" }}> TEST TO START PAGE</StyledText>
          </SettingsItem>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 25,
  },
  section: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
  logout: {
    bottom: 0,
    // position: "absolute",
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    alignSelf: "center",
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
