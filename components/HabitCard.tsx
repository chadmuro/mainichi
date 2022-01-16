import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-elements";

interface HabitCardProps {
  habit: {
    id: string;
    emoji: string;
    name: string;
    color: string;
    dayStreak: number;
  };
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles({ color: habit.color }).container,
        habit.dayStreak
          ? styles({ color: habit.color }).defaultContainer
          : styles({ color: habit.color }).completedContainer,
      ]}
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
              color: habit.dayStreak ? theme.colors?.white : "#000",
            }}
          >
            {habit.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginRight: 3 }}>🔥</Text>
          <Text
            style={{ color: habit.dayStreak ? theme.colors?.white : "#000" }}
          >
            {habit.dayStreak} day
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
