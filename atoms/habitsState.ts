import { selector } from 'recoil';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { userState } from './userState';

// eslint-disable-next-line import/prefer-default-export
export const habitSelector = selector({
  key: 'habitSelector',
  get: async ({ get }) => {
    console.log('firestore run');
    const docRef = collection(firestore, get(userState) || '');
    const querySnapshot = await getDocs(docRef);
    const allHabits: any[] = [];
    querySnapshot.forEach(doc => {
      allHabits.push({ id: doc.id, ...doc.data() });
    });
    return allHabits;
  },
});
