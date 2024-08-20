import { Text } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../config/theme";

//receives font size and weight as input

const StyledText = ({ children, small, big, style, bold, ...props }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <Text
      style={[
        {
          color: activeColors.Text,
          fontSize: small ? 12 : big ? 24 : 14,
          fontWeight: bold || big ? "bold" : "normal",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;
