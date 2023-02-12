import * as React from "react";
import { Button, View } from "react-native";
import Circle from "../screens/Circle";
import SettingsScreen from "../screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../config/theme";
import News from "../screens/News";
import { ThemeContext } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function Footer() {
  //TODO: Add Settings Screen
  //TODO: Add Profile Screen
  //TODO: Add Shop Screen
  //TODO: Add Rewards Screen
  //TODO: Add Dark/Light mode Switch
  const theme = { mode: "dark" };
  let activeColors = colors[theme.mode];
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: activeColors.primary,
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === "Circle") {
            iconColor = focused ? "blue" : "gray";
            return (
              <FontAwesome5 name="circle-notch" size={24} color={iconColor} />
            );
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            iconColor = focused ? "blue" : "gray";
            return <Ionicons name={iconName} size={24} color={iconColor} />;
          } else if (route.name === "News") {
            iconName = focused ? "newspaper" : "newspaper-outline";
            iconColor = focused ? "blue" : "gray";
            return <Ionicons name={iconName} size={24} color={iconColor} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* <Tab.Screen name="Logout" component={Logout} /> */}
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Circle" component={Circle} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}