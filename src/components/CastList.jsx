import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackPersonImage, image185 } from "../api/data/imagePath";

export default function CastList({ cast }) {
  const navigation = useNavigation();

  return (
    <View className="my-6">
      <Text className="text-white text-xl mx-4 mb-3">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast.length
          ? cast.map((person, index) => (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.push("Person", person)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-400">
                  <Image
                    source={{
                      uri: image185(person.profile_path) || fallbackPersonImage,
                    }}
                    className="rounded-2xl h-24 w-20"
                    style={{ resizeMode: "cover" }}
                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    lineHeight: 16,
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  {person.name.length > 10
                    ? `${person.name.slice(0, 10)}...`
                    : person.name}
                </Text>
                <Text
                  style={{
                    color: "rgb(163, 163, 163)",
                    fontSize: 12,
                    lineHeight: 16,
                    marginTop: 4,
                  }}
                >
                  {person.character.length > 10
                    ? `${person.character.slice(0, 10)}...`
                    : person.character}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
}
