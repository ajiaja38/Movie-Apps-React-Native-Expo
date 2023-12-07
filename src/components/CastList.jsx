import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CastList({ data }) {
  const navigation = useNavigation();

  let personName = "M. Aji Perdana";
  let characterName = "Optimus Prime";

  return (
    <View className="my-6">
      <Text className="text-white text-xl mx-4 mb-3">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {!!data &&
          data.map((person, index) => (
            <TouchableOpacity
              key={index}
              className="mr-4 items-center"
              onPress={() => navigation.navigate("Person", person)}
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-400">
                <Image
                  source={require("../../assets/profile.jpg")}
                  className="rounded-2xl h-24 w-20"
                  style={{ resizeMode: "cover" }}
                />
              </View>
              <Text className="text-white text-xs font-semibold mt-1">
                {personName.length > 10
                  ? `${personName.slice(0, 10)}...`
                  : personName}
              </Text>
              <Text className="text-neutral-400 text-xs mt-1">
                {characterName.length > 10
                  ? `${characterName.slice(0, 10)}...`
                  : characterName}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
