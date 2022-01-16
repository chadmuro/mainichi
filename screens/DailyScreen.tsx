import { useState } from "react";
import dayjs from "dayjs";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Chip, Text, useTheme } from "react-native-elements";
import Layout from "../components/Layout";
import {
  daysOfTheWeek,
  getDayOfTheWeek,
  DayOfTheWeek,
} from "../constants/daysOfTheWeek";
import HabitCard from "../components/HabitCard";

export default function DailyScreen() {
  const todayValue = dayjs().format("d");
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDay, setSelectedDay] = useState<DayOfTheWeek | undefined>(
    getDayOfTheWeek(todayValue)
  );

  function handleDayPress(value: DayOfTheWeek | undefined) {
    setSelectedDay(value);
  }
  const { theme } = useTheme();

  console.log(today);

  const testData = [
    {
      id: "1",
      emoji: "🐶",
      color: "#FFABAB",
      name: "Walk the dog",
      dayStreak: 4,
      // monthCount: [{ 1: ["2022-01-12", "2022-01-14", "2022-01-15"] }],
    },
    {
      id: "2",
      emoji: "🛌",
      color: "#6EB5FF",
      name: "Wake up early and what happens if the test is really really long",
      dayStreak: 1,
    },
    { id: "3", emoji: "💪", color: "#BFFCC6", name: "Pushups", dayStreak: 2 },
    { id: "4", emoji: "🧑‍💻", color: "#FFF5BA", name: "Code", dayStreak: 7 },
    { id: "5", emoji: "🧑‍💻", color: "#FF9CEE", name: "Code", dayStreak: 7 },
    { id: "6", emoji: "🧑‍💻", color: "#C5A3FF", name: "Code", dayStreak: 7 },
    {
      id: "7",
      emoji: "🐶",
      color: "#FFABAB",
      name: "Walk the dog",
      dayStreak: 0,
      // monthCount: [{ 1: ["2022-01-12", "2022-01-14", "2022-01-15"] }],
    },
    {
      id: "8",
      emoji: "🛌",
      color: "#6EB5FF",
      name: "Wake up early and what happens if the test is really really long",
      dayStreak: 0,
    },
    { id: "9", emoji: "💪", color: "#BFFCC6", name: "Pushups", dayStreak: 0 },
    { id: "10", emoji: "🧑‍💻", color: "#FFF5BA", name: "Code", dayStreak: 0 },
    { id: "11", emoji: "🧑‍💻", color: "#FF9CEE", name: "Code", dayStreak: 0 },
    { id: "12", emoji: "🧑‍💻", color: "#C5A3FF", name: "Code", dayStreak: 0 },
  ];

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.daysWrap}>
          {daysOfTheWeek.map((day) => (
            <>
              <TouchableOpacity
                key={day.value}
                onPress={() => handleDayPress(day)}
              >
                {todayValue === day.value && (
                  <Text
                    style={{
                      color: theme.colors?.white,
                      marginLeft: 3,
                      marginBottom: 3,
                    }}
                  >
                    Today
                  </Text>
                )}
                <Avatar
                  size={48}
                  rounded
                  title={day.day}
                  titleStyle={{
                    color:
                      selectedDay?.value === day.value
                        ? theme.colors?.white
                        : theme.colors?.primary,
                  }}
                  containerStyle={{
                    backgroundColor:
                      selectedDay?.value === day.value
                        ? theme.colors?.primary
                        : theme.colors?.white,
                    borderColor: theme.colors?.primary,
                    borderWidth: 1,
                  }}
                />
              </TouchableOpacity>
            </>
          ))}
        </View>
        {testData.map((habit) => (
          <HabitCard habit={habit} key={habit.id} />
        ))}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  daysWrap: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    width: "95%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
