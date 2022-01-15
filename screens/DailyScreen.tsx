import { useState } from "react";
import dayjs from "dayjs";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Chip, Text, useTheme } from "react-native-elements";
import {
  daysOfTheWeek,
  getDayOfTheWeek,
  DayOfTheWeek,
} from "../constants/DaysOfTheWeek";
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
      color: "red",
      name: "Walk the dog",
      dayStreak: 4,
      // monthCount: [{ 1: ["2022-01-12", "2022-01-14", "2022-01-15"] }],
    },
    {
      id: "2",
      emoji: "🛌",
      color: "blue",
      name: "Wake up early and what happens if the test is really really long",
      dayStreak: 0,
    },
    { id: "3", emoji: "💪", color: "green", name: "Pushups", dayStreak: 2 },
    { id: "4", emoji: "🧑‍💻", color: "yellow", name: "Code", dayStreak: 7 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Chip
        title="Today"
        type={selectedDay?.value === todayValue ? "solid" : "outline"}
        containerStyle={{ alignSelf: "flex-end", marginRight: 15 }}
        onPress={() => handleDayPress(getDayOfTheWeek(todayValue))}
      />
      <View style={styles.daysWrap}>
        {daysOfTheWeek.map((day) => (
          <TouchableOpacity key={day.value} onPress={() => handleDayPress(day)}>
            <Avatar
              size={48}
              rounded
              title={day.day}
              titleStyle={{
                color:
                  selectedDay?.value === day.value
                    ? "white"
                    : theme.colors?.primary,
              }}
              containerStyle={{
                marginHorizontal: 2,
                backgroundColor:
                  selectedDay?.value === day.value
                    ? theme.colors?.primary
                    : "white",
                borderColor: theme.colors?.primary,
                borderWidth: 1,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text h4>{selectedDay?.name}</Text>
      {testData.map((habit) => (
        <HabitCard habit={habit} key={habit.id} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  daysWrap: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
});
