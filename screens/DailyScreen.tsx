import React from 'react';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-elements';
import Layout from '../components/Layout';
import HabitCard from '../components/HabitCard';
import { habitSelector } from '../atoms/habitsState';

export default function DailyScreen() {
  const todaysDate = dayjs().format('YYYY MMMM DD');
  const { theme } = useTheme();
  const habits = useRecoilValue(habitSelector);

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
