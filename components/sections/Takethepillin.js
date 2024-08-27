import React, { useContext } from "react";
import { View, Text } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";


const Takethepillin = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <View style={{marginTop:48,}}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "semibold",
          alignSelf:"center",
          marginTop: 48,
          marginBottom: 32,
          color: activeColors.text,
        }}
      >
        Take the pill in
      </Text>
    </View>
  );
};

export default Takethepillin;
