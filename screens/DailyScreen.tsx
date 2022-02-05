/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collection, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-elements';
import { firestore } from '../firebase';
import Layout from '../components/Layout';
import HabitCard from '../components/HabitCard';
import { habitsState } from '../atoms/habitsState';
import { userState } from '../atoms/userState';
import { getDayOfTheWeek } from '../constants/daysOfTheWeek';

export default function DailyScreen() {
  const dayValue = dayjs().day();
  const todaysDate = `${dayjs().format('YYYY MMMM DD')}, ${
    getDayOfTheWeek(dayValue)?.name
  }`;
  const { theme } = useTheme();
  const [habits, setHabits] = useRecoilState(habitsState);
  const user = useRecoilValue(userState);

  const getHabits = async () => {
    console.log('firestore run');
    const docRef = collection(firestore, user || '');
    const querySnapshot = await getDocs(docRef);
    const allHabits: any[] = [];
    querySnapshot.forEach(doc => {
      allHabits.push({ id: doc.id, ...doc.data() });
    });
    setHabits(allHabits);
  };

  useEffect(() => {
    getHabits();
  }, []);
  console.log(habits);

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '95%',
        }}
      >
        <View style={styles.titleWrap}>
          <Text
            style={{
              color: theme.colors?.white,
              fontSize: 20,
            }}
          >
            {todaysDate}
          </Text>
        </View>
        {habits &&
          habits.map(habit => <HabitCard habit={habit} key={habit.id} />)}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  titleWrap: {
    marginVertical: 10,
  },
});
