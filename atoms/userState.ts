import { selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line import/prefer-default-export
export const userState = selector({
  key: 'userState',
  get: async () => {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      return value;
    }
    return undefined;
  },
});
