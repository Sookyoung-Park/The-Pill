import React, { useContext } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import {
  SafeAreaView,
  View,
  Text,
  Image,
} from "react-native";
import CustomButton from "../components/CustomButton";

const OnboardingScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../images/login.png")}
            style={{
              height: 200,
              width: 300,
              transform: [{ rotate: "-5deg" }],
              marginBottom: 60,
            }}
          />
        </View>

        <CustomButton
          label={"Start"}
          onPress={() => {
            navigation.navigate("Footer");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
