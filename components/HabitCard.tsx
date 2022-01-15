import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

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
            style={[
              styles({ color: habit.color }).mainText,
              styles({ color: habit.color }).icon,
            ]}
          >
            {habit.emoji}
          </Text>
          <Text style={styles({ color: habit.color }).mainText}>
            {habit.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles({ color: habit.color }).icon}>🔥</Text>
          <Text>{habit.dayStreak} day</Text>
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
    mainText: {
      fontSize: 18,
    },
    icon: {
      marginRight: 3,
    },
  });
