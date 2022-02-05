import { atom, selector } from 'recoil';
import { collection, getDocs } from 'firebase/firestore';
import { Habit } from '../constants/habit';
import { firestore } from '../firebase';

// eslint-disable-next-line import/prefer-default-export
export const habitSelector = selector({
  key: 'habitSelector',
  get: async ({ get }) => {
    console.log('firestore run');
    const docRef = collection(firestore, 'HNI64aQwZegC2mDaaVGk');
    const querySnapshot = await getDocs(docRef);
    const allHabits: any[] = [];
    querySnapshot.forEach(doc => {
      allHabits.push({ id: doc.id, ...doc.data() });
    });
    return allHabits;
  },
});
