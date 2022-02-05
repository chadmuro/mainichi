import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-elements';
import Layout from '../components/Layout';
import {
  daysOfTheWeek,
  getDayOfTheWeek,
  DayOfTheWeek,
} from '../constants/daysOfTheWeek';
import HabitCard from '../components/HabitCard';
import { habitSelector } from '../atoms/habitsState';

export default function DailyScreen() {
  const todayValue = dayjs().format('d');
  const [selectedDay, setSelectedDay] = useState<DayOfTheWeek | undefined>(
    getDayOfTheWeek(todayValue),
  );
  const { theme } = useTheme();
  const habits = useRecoilValue(habitSelector);

  function handleDayPress(value: DayOfTheWeek | undefined) {
    setSelectedDay(value);
  }

  console.log(habits);

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.daysWrap}>
          {daysOfTheWeek.map(day => (
            <TouchableOpacity
              key={day.value}
              onPress={() => handleDayPress(day)}
            >
              {todayValue === day.value && (
                <Text
                  style={{
                    color: theme.colors?.white,
                    marginLeft: 3,
                    marginBottom: 3,
                  }}
                >
                  Today
                </Text>
              )}
              <Avatar
                size={48}
                rounded
                title={day.day}
                titleStyle={{
                  color:
                    selectedDay?.value === day.value
                      ? theme.colors?.white
                      : theme.colors?.primary,
                }}
                containerStyle={{
                  backgroundColor:
                    selectedDay?.value === day.value
                      ? theme.colors?.primary
                      : theme.colors?.white,
                  borderColor: theme.colors?.primary,
                  borderWidth: 1,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        {habits &&
          habits.map(habit => <HabitCard habit={habit} key={habit.id} />)}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  daysWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
