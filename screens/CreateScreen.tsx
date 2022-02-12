/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
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

type CreateFormValues = {
  title: string;
  emoji: string;
};

export default function CreateScreen({ navigation }: any) {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateFormValues>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color>('#FFABAB');
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
      reset();
      navigation.navigate('Daily');
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const onSubmit: SubmitHandler<CreateFormValues> = data => {
    postHabit({
      dayStreak: 0,
      emoji: data.emoji,
      name: data.title,
      color: selectedColor,
      dates: [],
    });
  };

  const handlePick = (emojiObject: EmojiType) => {
    setValue('emoji', emojiObject.emoji);
  };

  return (
    <Layout>
      <View style={styles.formWrap}>
        <View style={styles.inputWrap}>
          <Text style={{ color: theme.colors?.white, fontSize: 18 }}>
            Title
          </Text>
          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                autoFocus
                placeholder="Enter new habit"
                value={value}
                onChangeText={onChange}
                errorStyle={{ color: 'red' }}
                errorMessage={errors.title ? errors.title.message : undefined}
                style={{ color: theme.colors?.white, fontSize: 18 }}
              />
            )}
            rules={{ required: 'Habit title is required' }}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: theme.colors?.white, fontSize: 18 }}>
            Emoji
          </Text>
          <Controller
            name="emoji"
            control={control}
            render={({ field: { value } }) => (
              <Input
                placeholder="Enter emoji"
                value={value}
                onFocus={() => setIsOpen(true)}
                errorStyle={{ color: 'red' }}
                errorMessage={errors.emoji ? errors.emoji.message : undefined}
                style={{ color: theme.colors?.white, fontSize: 18 }}
              />
            )}
            rules={{ required: 'Emoji is required' }}
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
          onPress={handleSubmit(onSubmit)}
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
    marginBottom: 10,
  },
  colorsWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
