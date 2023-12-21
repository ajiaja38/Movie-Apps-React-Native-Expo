import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import MovieAPI from "../api/data";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const getTrendingMovies = async () => {
    const data = await MovieAPI.getTrendingMovies();
    setTrending(data.results);
    setIsLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await MovieAPI.getUpcomingMovies();
    setUpcoming(data.results);
    setIsLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await MovieAPI.getTopRatedMovies();
    setTopRated(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getTrendingMovies();
      getUpcomingMovies();
      getTopRatedMovies();
    }, 1000);
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-3">
        <StatusBar style="light" />
        <View className="flex-row justify-between mx-4 mt-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
              lineHeight: 36,
            }}
          >
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length && <TrendingMovies data={trending} />}
          {upComing.length ? (
            <MovieList title="Upcoming" data={upComing} />
          ) : null}
          {topRated.length ? (
            <MovieList title="Top Rated" data={topRated} />
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}
