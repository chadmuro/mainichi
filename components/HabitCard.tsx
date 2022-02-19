import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { useTheme } from 'react-native-elements';
import { useRecoilValue, useRecoilState } from 'recoil';
import { firestore } from '../firebase';
import { getDayText } from '../constants/daysOfTheWeek';
import { userState } from '../atoms/userState';
import { habitsState } from '../atoms/habitsState';
import { Habit } from '../constants/habit';

interface HabitCardProps {
  habit: Habit;
  selectedDate: number;
}

export default function HabitCard({ habit, selectedDate }: HabitCardProps) {
  const { theme } = useTheme();
  const user = useRecoilValue(userState);
  const [habits, setHabits] = useRecoilState(habitsState);

  const completed = !!habit.dates?.includes(selectedDate);

  const onHabitPress = async (habitId: string) => {
    if (completed) {
      try {
        console.log('firestore updated');
        const docRef = doc(firestore, user || '', habitId);
        await updateDoc(docRef, {
          dates: arrayRemove(selectedDate),
          dayStreak: increment(-1),
        });
        const oldHabitIndex = habits.findIndex(habit => habit.id === habitId);
        const oldHabit = habits[oldHabitIndex];
        const newDates = oldHabit.dates.filter(date => date !== selectedDate);
        const newHabit = {
          ...oldHabit,
          dates: [...newDates],
          dayStreak: oldHabit.dayStreak - 1,
        };
        const newHabits = [...habits];
        newHabits.splice(oldHabitIndex, 1, newHabit);
        setHabits(newHabits);
      } catch (err: any) {
        Alert.alert(err.message);
      }
    } else {
      try {
        console.log('firestore updated');
        const docRef = doc(firestore, user || '', habitId);
        await updateDoc(docRef, {
          dates: arrayUnion(selectedDate),
          dayStreak: increment(1),
        });
        const oldHabitIndex = habits.findIndex(habit => habit.id === habitId);
        const oldHabit = habits[oldHabitIndex];
        const newHabit = {
          ...oldHabit,
          dates: [...(oldHabit?.dates || []), selectedDate],
          dayStreak: oldHabit.dayStreak + 1,
        };
        const newHabits = [...habits];
        newHabits.splice(oldHabitIndex, 1, newHabit);
        setHabits(newHabits);
      } catch (err: any) {
        Alert.alert(err.message);
      }
    }
  };

  if (selectedDate < habit.createdAt) {
    return null;
  }

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
            flexDirection: 'row',
            alignItems: 'center',
            flexBasis: '90%',
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
              color: completed ? '#000' : theme.colors?.white,
            }}
          >
            {habit.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 3 }}>🔥</Text>
          <Text style={{ color: completed ? '#000' : theme.colors?.white }}>
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
      width: '80%',
    },
    defaultContainer: {
      borderColor: color,
      borderWidth: 1,
      width: '80%',
    },
    mainWrap: {
      paddingHorizontal: 15,
      paddingVertical: 25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
