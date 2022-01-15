import { useState } from "react";
import dayjs from "dayjs";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Chip, useTheme } from "react-native-elements";
import {
  daysOfTheWeek,
  getDayOfTheWeek,
  DayOfTheWeek,
} from "../constants/DaysOfTheWeek";

export default function DailyScreen() {
  const today = dayjs().format("d");
  const [selectedDay, setSelectedDay] = useState<DayOfTheWeek | undefined>(
    getDayOfTheWeek(today)
  );

  function handleDayPress(value: DayOfTheWeek | undefined) {
    setSelectedDay(value);
  }
  const { theme } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Chip
        title="Today"
        type={selectedDay?.value === today ? "solid" : "outline"}
        containerStyle={{ alignSelf: "flex-end", marginRight: 15 }}
        onPress={() => handleDayPress(getDayOfTheWeek(today))}
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
      <Text>{selectedDay?.name}</Text>
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
