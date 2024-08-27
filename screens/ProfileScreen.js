import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

import ExpandableList from "../components/content/ExplandableList";



const ProfileScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.primary,
      }}
    >
      <ExpandableList/>
    </View>
  );
};

export default ProfileScreen;
