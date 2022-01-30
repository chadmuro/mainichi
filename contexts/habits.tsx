import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { Alert } from 'react-native';
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { Habit } from '../constants/habit';

const HabitContext = createContext<
  | {
      habits: Habit[];
      postHabit: (habit: Omit<Habit, 'id'>) => Promise<void>;
      completeHabit: (habitId: string, date: string) => Promise<void>;
      removeCompleteHabit: (habitId: string, date: string) => Promise<void>;
    }
  | undefined
>(undefined);

function HabitProvider({ children, username }: any) {
  const [habits, setHabits] = useState<Habit[]>([]);

  const getHabits = useCallback(
    () => async () => {
      try {
        console.log('firestore run');
        const docRef = collection(firestore, username);
        const querySnapshot = await getDocs(docRef);
        const allHabits: any[] = [];
        querySnapshot.forEach(doc => {
          allHabits.push({ id: doc.id, ...doc.data() });
        });
        setHabits(allHabits);
      } catch (err: any) {
        Alert.alert(err.message);
      }
    },
    [username],
  );

  useEffect(() => {
    getHabits();
  }, [getHabits]);

  const value = useMemo(
    () => ({
      habits,
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
    [habits, username],
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
