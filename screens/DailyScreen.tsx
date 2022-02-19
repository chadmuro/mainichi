/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collection, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-elements';
import { firestore } from '../firebase';
import Layout from '../components/Layout';
import HabitCard from '../components/HabitCard';
import { habitsState } from '../atoms/habitsState';
import { userState } from '../atoms/userState';
import { getDayOfTheWeek } from '../constants/daysOfTheWeek';

export default function DailyScreen() {
  const { theme } = useTheme();
  const [habits, setHabits] = useRecoilState(habitsState);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf(),
  );
  const todaysDate = `${dayjs(selectedDate).format('YYYY MMMM DD')}, ${
    getDayOfTheWeek(dayjs(selectedDate).day())?.name
  }`;
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
          <TouchableOpacity>
            <MaterialIcons
              name="arrow-back-ios"
              color="#fff"
              size={26}
              onPress={() =>
                setSelectedDate(prevDate =>
                  dayjs(prevDate).add(-1, 'day').valueOf(),
                )
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              color: theme.colors?.white,
              fontSize: 20,
            }}
          >
            {todaysDate}
          </Text>
          <TouchableOpacity>
            <MaterialIcons
              name="arrow-forward-ios"
              color="#fff"
              size={26}
              onPress={() =>
                setSelectedDate(prevDate =>
                  dayjs(prevDate).add(1, 'day').valueOf(),
                )
              }
            />
          </TouchableOpacity>
        </View>
        {habits &&
          habits.map(habit => (
            <HabitCard
              habit={habit}
              key={habit.id}
              selectedDate={selectedDate}
            />
          ))}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  titleWrap: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
