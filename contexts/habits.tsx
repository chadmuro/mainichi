import { useMemo, createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { useRecoilValue } from 'recoil';
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { userState } from '../atoms/userState';

const HabitContext = createContext<
  | {
      completeHabit: (habitId: string, date: string) => Promise<void>;
      removeCompleteHabit: (habitId: string, date: string) => Promise<void>;
    }
  | undefined
>(undefined);

function HabitProvider({ children }: any) {
  const user = useRecoilValue(userState);

  const value = useMemo(
    () => ({
      completeHabit: async (habitId: string, date: string) => {
        try {
          console.log('firestore updated');
          const docRef = doc(firestore, user || '', habitId);
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
          const docRef = doc(firestore, user || '', habitId);
          await updateDoc(docRef, {
            dates: arrayRemove(date),
            dayStreak: increment(-1),
          });
        } catch (err: any) {
          Alert.alert(err.message);
        }
      },
    }),
    [user],
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
