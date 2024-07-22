import React, { useContext, useState, useRef } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { StyleSheet } from "react-native";
import Takethepillin from "../components/sections/Takethepillin";
import Timer from "../components/content/Timer";
import MainCalendar from "../components/content/MainCalendar";

const HomeScreens = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Fetch new data here and update your state

    // After fetching the data, set refreshing to false
    setRefreshing(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.Container,
      ]}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexGrow: 1 }}>
        <Takethepillin />
        <Timer/>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          ></View>

          <View>
              <View
                style={{
                  paddingHorizontal: 10,
                  marginTop: 60,
                  marginBottom: 15,
                  color: activeColors.text,
                }}
              />
              <MainCalendar/>
            </View>
          


        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 25,
    marginLeft: 25,
    marginBottom: 25,
  },
});

export default HomeScreens;
