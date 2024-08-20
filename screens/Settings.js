// datepicker 안됨.

import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import StyledText from "../components/texts/StyledText";
import SettingsItem from "../components/settings/SettingsItem";
import { Ionicons } from "@expo/vector-icons";
import {storeData, getData} from '../config/asyncStorage'
import NumericInput from 'react-native-numeric-input'
import FlipToggle from 'react-native-flip-toggle-button'
import DatePicker from "react-native-date-picker";

import pillimg from "../images/pillimg.png"
import ringimg from "../images/ringimg.png"
import patchimg from "../images/patchimg.png"

const SettingsScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const [selectedButton, setSelectedButton] = useState(null);
  const [settings, setSettings] = useState({
    activePills: 21,
    placeboPills: 7,
    reminderTime: "2:30pm",
    startDate: "2024-10-31",
    takePlacebo: false,
  });
  const [editing, setEditing] = useState(null); // Track which field is being edited
  const [editValue, setEditValue] = useState(0); // Temporary value holder for editing
  const [editTakePlacebo, setEditTakePlacebo]=useState(false)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  let activeColors = colors[theme.mode];

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await getData("userSettings");
        const storedButton = await getData("selectedButton");

        if (storedSettings) {
          const startDate = new Date(storedSettings.startDate);
          setSettings(storedSettings);
          setDate(startDate);
        }
        if (storedButton !== null) {
          setSelectedButton(parseInt(storedButton));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();
  }, []);

  const handlePress = async (index) => {
    setSelectedButton(index);
    await storeData("selectedButton", index.toString());
  };

  const handleEdit = (key) => {
    if (key === "startDate") {
      setOpen(true); // Open the DatePicker modal when editing the startDate
    }
    setEditing(key);
    setEditValue(settings[key]);
  };


  const handleSave = async (key) => {
    const updatedSettings = { ...settings, [key]: editValue };
    setSettings(updatedSettings);
    await storeData("userSettings", updatedSettings);
    setEditing(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString("en-US"); // Format the date as MM/DD/YYYY
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {/* <Button title="Save"></Button> */}
      <View style={styles.section}>
        <StyledText
          style={{ color: activeColors.accent, marginBottom: 24 }}
          bold
        >
          Contraception
        </StyledText>
        <View style={styles.container2}>
          <TouchableOpacity
            style={[
              styles.contraception_button,
              selectedButton === 0 && styles.selectedButton,
            ]}
            onPress={() => handlePress(0)}
          >
            <Image source={pillimg} style={styles.image} />
            <StyledText style={styles.buttonText}>Pill</StyledText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contraception_button,
              selectedButton === 1 && styles.selectedButton,
            ]}
            onPress={() => handlePress(1)}
          >
            <Image source={ringimg} style={styles.image} />
            <StyledText style={styles.buttonText}>Ring</StyledText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contraception_button,
              selectedButton === 2 && styles.selectedButton,
            ]}
            onPress={() => handlePress(2)}
          >
            <Image source={patchimg} style={styles.image} />
            <StyledText style={styles.buttonText}>Patch</StyledText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <StyledText style={{ color: activeColors.accent, marginBottom: 16 }} bold>
          Days
        </StyledText>
        <SettingsItem label="Active Pills">
          {editing === "activePills" ? (
            <View style={styles.editContainer}>
              <NumericInput
                value={editValue}
                onChange={setEditValue}
                totalWidth={80}
                totalHeight={36}
                iconSize={24}
                step={1}
                minValue={1}
                maxValue={31}
                valueType="integer"
                rounded
                textColor="#000"
                iconStyle={{ color: "black" }}
                rightButtonBackgroundColor="white"
                leftButtonBackgroundColor="white"
              />
              <Button title="Save" onPress={() => handleSave("activePills")} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleEdit("activePills")}>
              <StyledText>{settings.activePills} days</StyledText>
            </TouchableOpacity>
          )}
        </SettingsItem>

        <SettingsItem label="Do you take Placebo/Sugar Pills?">
          {/* {editing === "takePlacebo" ? ( */}
            <View style={styles.editContainer}>
              <FlipToggle
                value={editTakePlacebo}
                buttonWidth={72}
                buttonHeight={36}
                buttonRadius={100}
                sliderWidth={20}
                sliderHeight={20}
                sliderRadius={50}
                onLabel={"Yes"}
                offLabel={"No"}
                labelStyle={{ color: 'black', fontSize: '14'}}
                onToggle={() => setEditTakePlacebo(!editValue)}
                onPress={() => handleSave("takePlacebo")} 
                buttonOnColor={'#f5f5f5'}
                buttonOffColor={'#ECECEC'}
                sliderOnColor={'#FF1F55'}
                sliderOffColor={'#999'}
              />
            </View>
        </SettingsItem>

        <SettingsItem label="Placebo/Sugar Pills">
          {editing === "placeboPills" ? (
            <View style={styles.editContainer}>
              <NumericInput
                value={editValue}
                onChange={setEditValue}
                totalWidth={80}
                totalHeight={36}
                iconSize={24}
                step={1}
                minValue={1}
                maxValue={31}
                valueType="integer"
                rounded
                textColor="#000"
                iconStyle={{ color: "black" }}
                rightButtonBackgroundColor="white"
                leftButtonBackgroundColor="white"
              />
              <Button title="Save" onPress={() => handleSave("placeboPills")} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleEdit("placeboPills")}>
              <StyledText>{settings.placeboPills} days</StyledText>
            </TouchableOpacity>
          )}
        </SettingsItem>

        <SettingsItem label="Start Date">
          {editing === "startDate" ? (
            <View style={styles.editContainer}>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                  setDate(selectedDate);
                  setOpen(false);
                  handleSave("startDate");
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <Button title="Save" onPress={() => handleSave("startDate")} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleEdit("startDate")}>
              <StyledText>{settings.startDate}</StyledText>
            </TouchableOpacity>
          )}
        </SettingsItem>
      </View>

      <View style={styles.section}>
        <StyledText style={{ color: activeColors.accent, marginBottom: 16 }} bold>
          Reminder
        </StyledText>

        <SettingsItem label="Push Notification Reminder">
          {editing === "reminderTime" ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={editValue}
                onChangeText={setEditValue}
              />
              <Button title="Save" onPress={() => handleSave("reminderTime")} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleEdit("reminderTime")}>
              <StyledText>{settings.reminderTime}</StyledText>
            </TouchableOpacity>
          )}
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
    padding: 20,
    paddingTop: 60,
  },
  section: {
    borderRadius: 12,
    padding: 12,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logout: {
    bottom: 0,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    alignSelf: "center",
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contraception_button: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderWidth: 1.6,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    marginHorizontal: 10,
  },
    selectedButton: {
    borderColor: '#FF1F55',
  },
  image: {
    width: 60,                
    height: 60,               
    resizeMode: 'contain',
  },
  buttonText: {
    marginTop: 10,  
    textAlign: 'center',
    color: "#000",
    fontSize:12,
  },
});

export default SettingsScreen;