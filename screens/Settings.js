import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
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
import DateTimePicker from '@react-native-community/datetimepicker';

import pillimg from "../images/pillimg.png"
import ringimg from "../images/ringimg.png"
import patchimg from "../images/patchimg.png"


const SettingsScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const [selectedButton, setSelectedButton] = useState(null);
  const [settings, setSettings] = useState({
    activePills: 21,
    placeboPills: 7,
    breakDays: 7, // 새로운 상태 추가
    reminderTime: "2:30pm",
    startDate: "2024-08-29T08:20:00.000Z",
    takePlacebo: false,
  });
  const [editing, setEditing] = useState(false); 
  const [editValues, setEditValues] = useState(settings);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  let activeColors = colors[theme.mode];

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await getData("userSettings");
        const storedButton = await getData("selectedButton");

        if (storedSettings) {
          const startDate = new Date(storedSettings.startDate);
          setSettings(storedSettings);
          setEditValues(storedSettings);
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

  const handleEditToggle = () => {
    if (editing) {
      setSettings(editValues);
      storeData("userSettings", editValues);
    }
    setEditing(!editing);
  };

  const handleValueChange = (key, value) => {
    setEditValues({ ...editValues, [key]: value });
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString("en-US");
  };

  console.log("date", date);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.Edit}>
        <TouchableOpacity onPress={handleEditToggle}>
          <View>
            <Ionicons name={editing ? "save-outline" : "create-outline"} size={24} color="red" />
            <StyledText style={{ color: "red" }}>{editing ? "Save" : "Edit"}</StyledText>
          </View>
        </TouchableOpacity>
      </View>

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
            disabled={!editing}
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
            disabled={!editing}
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
            disabled={!editing}
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
          {editing ? (
            <NumericInput
              value={editValues.activePills}
              onChange={(value) => handleValueChange("activePills", value)}
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
          ) : (
            <StyledText>{settings.activePills} days</StyledText>
          )}
        </SettingsItem>

        <SettingsItem label="Do you take Placebo/Sugar Pills?">
          {editing ? (
            <FlipToggle
              value={editValues.takePlacebo}
              buttonWidth={72}
              buttonHeight={36}
              buttonRadius={100}
              sliderWidth={20}
              sliderHeight={20}
              sliderRadius={50}
              onLabel={"Yes"}
              offLabel={"No"}
              labelStyle={{ color: 'black', fontSize: '14'}}
              onToggle={(value) => handleValueChange("takePlacebo", value)}
              buttonOnColor={'#f5f5f5'}
              buttonOffColor={'#ECECEC'}
              sliderOnColor={'#FF1F55'}
              sliderOffColor={'#999'}
            />
          ) : (
            <StyledText>{settings.takePlacebo ? "Yes" : "No"}</StyledText>
          )}
        </SettingsItem>

        {editValues.takePlacebo ? (
          <SettingsItem label="Placebo(Sugar)">
            {editing ? (
              <NumericInput
                value={editValues.placeboPills}
                onChange={(value) => handleValueChange("placeboPills", value)}
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
            ) : (
              <StyledText>{settings.placeboPills} days</StyledText>
            )}
          </SettingsItem>
        ) : (
          <SettingsItem label="Break days">
            {editing ? (
              <NumericInput
                value={editValues.breakDays}
                onChange={(value) => handleValueChange("breakDays", value)}
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
            ) : (
              <StyledText>{settings.breakDays} days</StyledText>
            )}
          </SettingsItem>
        )}
        <SettingsItem label="Starting Date">
        {editing ? (
          <View>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <StyledText>{formatDate(editValues.startDate)}</StyledText>
            </TouchableOpacity>
            <View>
      {/* <Button title="Open DatePicker" onPress={() => setOpen(true)} /> */}
    <DateTimePicker
      // value={date}
      value={isNaN(date.getTime()) ? new Date() : date}
      mode="date"
      display="default"
      onChange={(event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      }}
    />
    </View>
    </View>
  ) : (
    // <StyledText>{formatDate(settings.startDate)}</StyledText>
    <StyledText>{formatDate(date)}</StyledText>
  )}
  </SettingsItem>
      </View>

      <View style={styles.section}>
        <StyledText style={{ color: activeColors.accent, marginBottom: 16 }} bold>
          Reminder
        </StyledText>

        <SettingsItem label="Push Notification Reminder">
          {editing ? (
            <TextInput
              style={styles.input}
              value={editValues.reminderTime}
              onChangeText={(value) => handleValueChange("reminderTime", value)}
            />
          ) : (
            <StyledText>{settings.reminderTime}</StyledText>
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
    padding: 0,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 32,
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