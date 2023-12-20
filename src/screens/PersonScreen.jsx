import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-900">
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
                  source={require("../../assets/profile.jpg")}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              <Text className="text-3xl text-white text-center font-bold">
                M. Aji Perdana
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                Tanggamus, Indonesia
              </Text>
            </View>
            <View className="mx-3 mt-6 p-4 bg-neutral-700 flex-row justify-between items-center rounded-full">
              <View className="items-center px-3 border-r-2 border-white">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-xs">Male</Text>
              </View>
              <View className="items-center px-3 border-r-2 border-white">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-xs">2001-09-24</Text>
              </View>
              <View className="items-center px-3 border-r-2 border-white">
                <Text className="text-white font-semibold">Known For</Text>
                <Text className="text-neutral-300 text-xs">Acting</Text>
              </View>
              <View className="items-center px-3">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-xs">94.3</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg font-semibold">
                Biography
              </Text>
              <Text className="text-neutral-400 tracking-wide text-base text-justify">
                Keanu Charles Reeves is a Canadian actor. Born in Beirut and
                raised in Toronto, he made his acting debut in the Canadian
                television series Hangin' In, before making his feature film
                debut in Youngblood. Reeves had his breakthrough role in the
                science fiction comedy Bill & Ted's Excellent Adventure (1989),
                and he reprised his role in its sequels. He gained praise for
                playing a hustler in the independent drama My Own Private Idaho
                (1991) and established himself as an action hero with leading
                roles in Point Break (1991) and Speed (1994).
              </Text>
            </View>
          </View>
          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </ScrollView>
      )}
    </View>
  );
}
