import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [result, setResult] = useState([1, 2, 3, 4, 5, 5, 5, 5]);
  const movieName = "Avengers: Infinity War";

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={28} strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-3"
      >
        <Text className="text-white font-semibold ml-1">
          Result ({result.length})
        </Text>
        <View className="flex-row justify-between flex-wrap">
          {result.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-2 mb-4">
                <Image
                  className="rounded-3xl"
                  source={require("../../assets/avengers.jpg")}
                  style={{ width: width * 0.44, height: height * 0.3 }}
                />
                <Text className="text-neutral-300 text-center ml-1">
                  {movieName.length > 22
                    ? movieName.slice(0, 22) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
