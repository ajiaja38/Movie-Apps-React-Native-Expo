import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";
import MovieList from "../components/MovieList";

const { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  let movieName = "Transformers: Rise of the Beasts";
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);

  const navigation = useNavigation();
  const { param: item } = useRoute();

  useEffect(() => {
    // Call the movie api details
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-4">
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
        <View>
          <Image
            source={require("../../assets/transformer.jpg")}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      <View style={{ marginTop: -height * 0.09 }} className="space-y-3">
        <Text className="text-gray-100 text-center  text-3xl font-bold tracking-wider">
          {movieName}
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released • 2020 • 170 min
        </Text>
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400  font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400  font-semibold text-base text-center">
            Thrill •
          </Text>
          <Text className="text-neutral-400  font-semibold text-base text-center">
            Sci-Fi
          </Text>
        </View>

        <Text className="text-neutral-400 text-justify text-base mx-4 tracking-wide">
          Optimus Prime and the Autobots team up with a down on his luck young
          man, an aspiring historian and with a powerful faction of Transformers
          known as the Maximals to combat a sinister force from outer space that
          threatens the Earth and all of mankind.
        </Text>
      </View>

      <CastList data={cast} />
      <MovieList title="Similar Movies" data={similarMovies} />
    </ScrollView>
  );
}
