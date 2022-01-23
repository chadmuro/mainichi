import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { useTheme } from "react-native-elements";
import { getDayText } from "../constants/daysOfTheWeek";
import { useHabits } from "../contexts/habits";

interface HabitCardProps {
  habit: {
    id: string;
    emoji: string;
    name: string;
    color: string;
    dayStreak: number;
    dates: string[];
  };
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { theme } = useTheme();
  const todayValue = dayjs().format("YYMMDD");
  const { completeHabit, removeCompleteHabit } = useHabits();

  const completed = !!habit.dates?.includes(todayValue);

  const onHabitPress = (habitId: string) => {
    if (completed) {
      removeCompleteHabit(habitId, todayValue);
    } else {
      completeHabit(habitId, todayValue);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles({ color: habit.color }).container,
        completed
          ? styles({ color: habit.color }).completedContainer
          : styles({ color: habit.color }).defaultContainer,
      ]}
      onPress={() => onHabitPress(habit.id)}
    >
      <View style={styles({ color: habit.color }).mainWrap}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginRight: 3,
            }}
          >
            {habit.emoji}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: completed ? "#000" : theme.colors?.white,
            }}
          >
            {habit.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginRight: 3 }}>🔥</Text>
          <Text style={{ color: completed ? "#000" : theme.colors?.white }}>
            {getDayText(habit.dayStreak)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

type StylesProps = {
  color: string;
};

const styles = ({ color }: StylesProps) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      marginVertical: 10,
    },
    completedContainer: {
      backgroundColor: color,
      width: "80%",
    },
    defaultContainer: {
      borderColor: color,
      borderWidth: 1,
      width: "80%",
    },
    mainWrap: {
      paddingHorizontal: 15,
      paddingVertical: 25,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
