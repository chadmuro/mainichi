import { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  doc,
  increment,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { Habit } from "../constants/habit";

const HabitContext = createContext<
  | {
      habits: Habit[];
      getHabits: () => Promise<void>;
      postHabit: (habit: Omit<Habit, "id">) => Promise<void>;
      completeHabit: (habitId: string, date: string) => Promise<void>;
      removeCompleteHabit: (habitId: string, date: string) => Promise<void>;
    }
  | undefined
>(undefined);

const HabitProvider = ({ children, username }: any) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  const getHabits = async () => {
    try {
      console.log("firestore run");
      const docRef = collection(firestore, username);
      const querySnapshot = await getDocs(docRef);
      const allHabits: any[] = [];
      querySnapshot.forEach((doc) => {
        allHabits.push({ id: doc.id, ...doc.data() });
      });
      setHabits(allHabits);
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const postHabit = async (habit: Omit<Habit, "id">) => {
    setPosting(true);
    setPosted(false);
    try {
      const docRef = collection(firestore, username);
      await setDoc(doc(docRef), habit);
      setPosting(false);
      setPosted(true);
    } catch (err: any) {
      Alert.alert(err.message);
      setPosting(false);
    }
  };

  const completeHabit = async (habitId: string, date: string) => {
    try {
      const docRef = doc(firestore, username, habitId);
      await updateDoc(docRef, {
        dates: arrayUnion(date),
        dayStreak: increment(1),
      });
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const removeCompleteHabit = async (habitId: string, date: string) => {
    try {
      const docRef = doc(firestore, username, habitId);
      await updateDoc(docRef, {
        dates: arrayRemove(date),
        dayStreak: increment(-1),
      });
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const value = {
    habits,
    getHabits,
    postHabit,
    completeHabit,
    removeCompleteHabit,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};

function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabit must be used within a HabitProvider");
  }
  return context;
}

export { HabitProvider, useHabits };
