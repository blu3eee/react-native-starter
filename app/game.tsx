import { Link, router, Stack } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import Board from "@/components/chess/Board";

export default function GameScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Chess" }} />
      <ScrollView>
        <View>
          <Board></Board>
        </View>

        <View className="p-4">
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              Alert.alert(
                "Are you sure?",
                "You are about to leave the game screen. Your game will be stopped.",
                [
                  { text: "Keep me in the game", style: "cancel" },
                  {
                    text: "Cancel the game",
                    onPress: () => {
                      router.replace("/");
                    },
                  },
                ],
              );
            }}
          >
            <ThemedText>Go back</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
