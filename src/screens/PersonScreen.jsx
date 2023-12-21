import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import PersonAPI from "../api/data/person";
import { fallbackPersonImage, image500 } from "../api/data/imagePath";

const { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const [person, SetPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const { params: item } = useRoute();

  const getDetailPerson = async () => {
    const data = await PersonAPI.getDetailPerson(item.id);
    SetPerson(data);
  };

  const getCreditsPerson = async () => {
    const data = await PersonAPI.getCreditsPerson(item.id);
    setPersonMovies(data.cast);
  };

  useEffect(() => {
    setTimeout(() => {
      getDetailPerson();
      getCreditsPerson();
      setIsLoading(false);
    }, 2000);
  }, [item]);

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(23 23 23)" }}>
      <SafeAreaView className="w-full flex-row justify-between items-center px-4 mt-4 mb-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-md p-1"
        >
          <ChevronLeftIcon size={28} strokeWidth={2} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon
            size={35}
            strokeWidth={2}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View>
            <View className="flex-row justify-center">
              <View className="items-center overflow-hidden rounded-full h-72 w-72 border-2 border-neutral-500">
                <Image
                  source={{
                    uri: image500(person.profile_path) || fallbackPersonImage,
                  }}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  lineHeight: 36,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {person.name}
              </Text>
              <Text
                style={{
                  color: "rgb(115, 115, 115)",
                  fontSize: 16,
                  lineHeight: 24,
                  textAlign: "center",
                }}
              >
                {person.place_of_birth}
              </Text>
            </View>
            <View className="mx-3 mt-6 p-4 bg-neutral-700 flex-row justify-between items-center rounded-full">
              <View className="items-center px-3 border-r-2 border-white">
                <Text style={{ color: "white", fontWeight: 600 }}>Gender</Text>
                <Text
                  style={{
                    color: "rgb(212 212 212)",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {person.gender
                    ? person.gender !== 1
                      ? "Male"
                      : "Female"
                    : "-"}
                </Text>
              </View>
              <View className="items-center px-3 border-r-2 border-white">
                <Text style={{ color: "white", fontWeight: 600 }}>
                  Birthday
                </Text>
                <Text
                  style={{
                    color: "rgb(212 212 212)",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {person.birthday ? person.birthday : "-"}
                </Text>
              </View>
              <View className="items-center px-3 border-r-2 border-white">
                <Text style={{ color: "white", fontWeight: 600 }}>
                  Known For
                </Text>
                <Text
                  style={{
                    color: "rgb(212 212 212)",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {person.known_for_department
                    ? person.known_for_department
                    : "-"}
                </Text>
              </View>
              <View className="items-center px-3">
                <Text style={{ color: "white", fontWeight: 600 }}>
                  Popularity
                </Text>
                <Text
                  style={{
                    color: "rgb(212 212 212)",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {person.popularity ? person.popularity.toFixed(1) : "-"}
                </Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  lineHeight: 28,
                  fontWeight: 600,
                }}
              >
                Biography
              </Text>
              <Text
                style={{
                  color: "rgb(163 163 163)",
                  fontSize: 16,
                  lineHeight: 24,
                  letterSpacing: 0.4,
                  textAlign: "justify",
                }}
              >
                {person.biography ? person.biography : "-"}
              </Text>
            </View>
          </View>
          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </ScrollView>
      )}
    </View>
  );
}
