import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Avatar, useTheme } from "react-native-elements";
import Layout from "../components/Layout";
import { Color, colors } from "../constants/colorSelect";
import { useHabits } from "../contexts/habits";

export default function CreateScreen() {
  const [selectedColor, setSelectedColor] = useState<Color>("#FFABAB");
  const [habitName, setHabitName] = useState("");
  const [habitEmoji, setHabitEmoji] = useState("");
  const { theme } = useTheme();
  const { postHabit } = useHabits();

  const onSubmit = () => {
    postHabit({
      dayStreak: 0,
      emoji: habitEmoji,
      name: habitName,
      color: selectedColor,
      dates: [],
    });
  };

  return (
    <Layout>
      <View style={styles.formWrap}>
        <View style={styles.inputWrap}>
          <Text style={{ color: theme.colors?.white, fontSize: 18 }}>
            Title
          </Text>
          <Input
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
            placeholder="Enter emoji"
            value={habitEmoji}
            onChangeText={setHabitEmoji}
            style={{ color: theme.colors?.white, fontSize: 18 }}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: theme.colors?.white, fontSize: 18 }}>
            Color
          </Text>
          <View style={styles.colorsWrap}>
            {colors.map((color) => (
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
          containerStyle={{ width: "100%", marginTop: 20 }}
          onPress={onSubmit}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formWrap: {
    width: "80%",
  },
  inputWrap: {
    display: "flex",
  },
  colorsWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
