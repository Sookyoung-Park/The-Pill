import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/Settings";

const Tab = createBottomTabNavigator();

export default function Footer() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = focused ? 26 : 24; // Active icon size larger
          if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } 
          else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } 
          else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={color}
              style={{ transform: [{ scale: focused ? 1.05 : 1 }] }}
            />
          );
        },
        tabBarActiveTintColor: activeColors.accent,
        tabBarInactiveTintColor: activeColors.tertiary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "semibold",
        },
        tabBarStyle: {
          backgroundColor: activeColors.primary,
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          borderTopLeftRadius:16,
          borderTopRightRadius:16,
          position: "absolute",
          shadowColor: "#575757",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          margin: 10,
        },
      })}
    >
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}