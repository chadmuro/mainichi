import React, { useState } from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { collection, setDoc, doc } from 'firebase/firestore';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Avatar, useTheme } from 'react-native-elements';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';
import Layout from '../components/Layout';
import { Color, colors } from '../constants/colorSelect';
import { habitsState } from '../atoms/habitsState';
import { Habit } from '../constants/habit';
import { firestore } from '../firebase';
import { userState } from '../atoms/userState';

export default function CreateScreen({ navigation }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color>('#FFABAB');
  const [habitName, setHabitName] = useState('');
  const [habitEmoji, setHabitEmoji] = useState('');
  const { theme } = useTheme();
  const setHabits = useSetRecoilState(habitsState);
  const user = useRecoilValue(userState);

  const postHabit = async (habit: Omit<Habit, 'id'>) => {
    try {
      console.log('firestore posted');
      const docRef = collection(firestore, user || '');
      await setDoc(doc(docRef), habit);
      const newHabit = { id: docRef.id, ...habit };
      setHabits(prevHabits => [...prevHabits, newHabit]);
      navigation.navigate('Daily');
      setHabitName('');
      setHabitEmoji('');
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const onSubmit = () => {
    postHabit({
      dayStreak: 0,
      emoji: habitEmoji as string,
      name: habitName,
      color: selectedColor,
      dates: [],
    });
  };

  const handlePick = (emojiObject: EmojiType) => {
    setHabitEmoji(emojiObject.emoji);
  };

  return (
    <Layout>
      <View style={styles.formWrap}>
        <View style={styles.inputWrap}>
          <Text style={{ color: theme.colors?.white, fontSize: 18 }}>
            Title
          </Text>
          <Input
            autoFocus
            placeholder="Enter new habit"
            value={habitName}
            onChangeText={setHabitName}
            style={{ color: theme.colors?.white, fontSize: 18 }}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: theme.colors?.white, fontSize: 18 }}>
            Emoji
          </Text>
          <Input
            autoFocus={false}
            placeholder="Enter emoji"
            value={habitEmoji}
            onChangeText={setHabitEmoji}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            style={{ color: theme.colors?.white, fontSize: 18 }}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: theme.colors?.white, fontSize: 18 }}>
            Color
          </Text>
          <View style={styles.colorsWrap}>
            {colors.map(color => (
              <Avatar
                key={color.name}
                size={40}
                rounded
                containerStyle={{
                  backgroundColor: color.hex,
                  borderWidth: 3,
                  borderColor:
                    selectedColor === color.hex
                      ? theme.colors?.white
                      : color.hex,
                }}
                onPress={() => setSelectedColor(color.hex)}
              />
            ))}
          </View>
        </View>
        <Button
          title="Submit"
          containerStyle={{ width: '100%', marginTop: 20 }}
          onPress={onSubmit}
        />
      </View>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  formWrap: {
    width: '80%',
  },
  inputWrap: {
    display: 'flex',
  },
  colorsWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
