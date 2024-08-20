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
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: activeColors.primary,
      }}
    >
      {/* <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: activeColors.tertiary,
          marginBottom: 20,
        }}
      >
        Your cart is empty
      </Text> */}
      <ExpandableList/>


      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          // backgroundColor: activeColors.accent,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            marginTop: 16,
            fontSize: 16,
            color: activeColors.accent,
          }}
        >
          Delete Account
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ProfileScreen;
