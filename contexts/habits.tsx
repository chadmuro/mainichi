import { useMemo, createContext, useContext } from 'react';
import { Alert } from 'react-native';
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  collection,
  setDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { Habit } from '../constants/habit';
import { useUser } from './user';

const HabitContext = createContext<
  | {
      postHabit: (habit: Omit<Habit, 'id'>) => Promise<void>;
      completeHabit: (habitId: string, date: string) => Promise<void>;
      removeCompleteHabit: (habitId: string, date: string) => Promise<void>;
    }
  | undefined
>(undefined);

function HabitProvider({ children }: any) {
  const { user: username } = useUser();

  const value = useMemo(
    () => ({
      postHabit: async (habit: Omit<Habit, 'id'>) => {
        try {
          console.log('firestore posted');
          const docRef = collection(firestore, username);
          await setDoc(doc(docRef), habit);
        } catch (err: any) {
          Alert.alert(err.message);
        }
      },
      completeHabit: async (habitId: string, date: string) => {
        try {
          console.log('firestore updated');
          const docRef = doc(firestore, username, habitId);
          await updateDoc(docRef, {
            dates: arrayUnion(date),
            dayStreak: increment(1),
          });
        } catch (err: any) {
          Alert.alert(err.message);
        }
      },
      removeCompleteHabit: async (habitId: string, date: string) => {
        try {
          console.log('firestore updated');
          const docRef = doc(firestore, username, habitId);
          await updateDoc(docRef, {
            dates: arrayRemove(date),
            dayStreak: increment(-1),
          });
        } catch (err: any) {
          Alert.alert(err.message);
        }
      },
    }),
    [username],
  );

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
}

function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabit must be used within a HabitProvider');
  }
  return context;
}

export { HabitProvider, useHabits };
