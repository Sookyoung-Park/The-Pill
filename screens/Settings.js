import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Appearance,
  Image,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import StyledText from "../components/texts/StyledText";
import SettingsItem from "../components/settings/SettingsItem";
import { Ionicons } from "@expo/vector-icons";

import pillimg from "../images/pillimg.png"
import ringimg from "../images/ringimg.png"
import patchimg from "../images/patchimg.png"

const SettingsScreen = ({ navigation }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const [selectedButton, setSelectedButton] = useState(null);
  let activeColors = colors[theme.mode];

  const handlePress = (index) => {
    setSelectedButton(index);
  };

  //here we set the state of the switch to the current theme
  //theme.mode is the current theme which we get from the context
  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === "dark");

  //here we toggle the theme and update the state of the switch
  // const toggleTheme = () => {
  //   updateTheme();
  //   setIsDarkTheme((prev) => !prev);
  // };

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
      <View style={styles.section}>
        <StyledText style={{ color: activeColors.accent }} bold>
          Contraception
        </StyledText>
        
        <View style={styles.container2}>
          <TouchableOpacity 
            style={[
              styles.contraception_button, 
              selectedButton === 0 && styles.selectedButton
            ]} 
            onPress={() => handlePress(0)}>
            <Image source={pillimg} style={styles.image} />
            <StyledText style={styles.buttonText}>Pill</StyledText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.contraception_button, 
              selectedButton === 1 && styles.selectedButton
            ]} 
            onPress={() => handlePress(1)}>
            <Image source={ringimg} style={styles.image} />
            <StyledText style={styles.buttonText}>Ring</StyledText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.contraception_button, 
              selectedButton === 2 && styles.selectedButton
            ]} 
            onPress={() => handlePress(2)}>
            <Image source={patchimg} style={styles.image} />
            <StyledText style={styles.buttonText}>Patch</StyledText>
          </TouchableOpacity>
        </View>
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
    borderRadius: 12,
    padding:12, 
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
    backgroundColor:"#ffffff",
    // iOS에서 사용되는 그림자 속성
    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 5, height: 5 },    // 그림자의 오프셋 (x, y)
    shadowOpacity: 0.3,                         // 그림자의 불투명도 (0에서 1 사이)
    shadowRadius: 10,                          // 그림자의 반경

    // Android에서 사용되는 그림자 속성
    elevation: 10,                             // Android에서의 그림자 깊이
    
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

  container2: {
    flexDirection: 'row',      // 세로 방향이 아니라 가로 방향으로 배치
    justifyContent: 'center',  // 버튼 사이의 간격을 자동으로 균등하게 조절
    alignItems: 'center',      // 세로로 가운데 정렬
    marginTop:16,
  },
  contraception_button: {
    flex: 1,                   // 각 버튼이 같은 크기로 나눠지도록 설정
    alignItems: 'center',
    // backgroundColor: 'red',
    padding: 12,
    borderWidth:1,
    borderColor: "#E8E8E8",
    borderRadius:10,
    marginHorizontal:10,

  },
  selectedButton: {
    borderColor: '#FF1F55', // 선택된 버튼의 borderColor
  },
  image: {
    width: 72,                // 이미지 너비
    height: 72,               // 이미지 높이
    resizeMode: 'contain',     // 이미지 비율 유지하며 크기 조정
  },
  buttonText: {
    marginTop: 8,                // 버튼 이미지 아래에 텍스트 간격을 설정
    textAlign: 'center',
  },
});

export default SettingsScreen;
