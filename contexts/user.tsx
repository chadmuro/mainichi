import { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext<
  | {
      user: string;
      loading: boolean;
    }
  | undefined
>(undefined);

function UserProvider({ children }: any) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const getUserData = async () => {
    try {
      setLoading(true);
      console.log('get username');
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        setUsername(value);
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      Alert.alert(err.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(username);

  const value = useMemo(
    () => ({
      user: username,
      loading,
    }),
    [username, loading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
