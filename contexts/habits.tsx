import { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const HabitContext = createContext<
  | {
      habits: any[];
      getHabits: () => Promise<void>;
    }
  | undefined
>(undefined);

const HabitProvider = ({ children }: any) => {
  const [habits, setHabits] = useState<any[]>([]);

  const getHabits = async () => {
    try {
      console.log("firestore run");
      const docRef = doc(firestore, "users", "oqQgY8sgIGpFqYbLOZCx");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHabits(docSnap.data().habits);
      } else {
        setHabits([]);
      }
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const value = { habits, getHabits };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};

function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { HabitProvider, useHabits };
