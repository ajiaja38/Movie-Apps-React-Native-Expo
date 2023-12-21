import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fallbackMoviePoster, imageOri } from "../api/data/imagePath";
import MovieAPI from "../api/data";

const { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const navigation = useNavigation();
  const { params: item } = useRoute();

  const getDetailMovie = async () => {
    const data = await MovieAPI.getDetailMovie(item.id);
    setMovie(data);
  };

  const getCreditsMovie = async () => {
    const data = await MovieAPI.getCreditsMovie(item.id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovie = async () => {
    const data = await MovieAPI.getSimilarMovies(item.id);
    setSimilarMovies(data.results);
  };

  useEffect(() => {
    setTimeout(() => {
      getDetailMovie();
      getCreditsMovie();
      getSimilarMovie();
      setIsloading(false);
    }, 2000);
  }, [item]);

  return (
    <>
      {isLoading ? (
        <View style={styling.commonContainer}>
          <Loading />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={styling.commonContainer}
          >
            <View className="w-full">
              <SafeAreaView style={styling.safeAreaView}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styling.background, { borderRadius: 6, padding: 4 }]}
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
                  source={{
                    uri: imageOri(movie.backdrop_path) || fallbackMoviePoster,
                  }}
                  style={{ width, height: height * 0.55 }}
                />
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(23, 23, 23, 0.8)",
                    "rgba(23, 23, 23, 1)",
                  ]}
                  style={{
                    width,
                    height: height * 0.4,
                    position: "absolute",
                    bottom: 0,
                  }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                />
              </View>
            </View>
            <View style={{ marginTop: -height * 0.09, gap: 12 }}>
              <Text style={styling.titleText}>{movie.title}</Text>
              {movie.id ? (
                <Text style={[styling.detailingText, styling.textDetail]}>
                  {movie?.status} •{" "}
                  {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
                  {movie?.runtime} min
                </Text>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 16,
                  gap: 8,
                }}
              >
                {movie?.genres?.map((genre, index) => (
                  <Text
                    key={genre.id}
                    style={[styling.detailingText, styling.textDetail]}
                  >
                    {genre.name}{" "}
                    {index + 1 !== movie.genres.length ? "•" : null}
                  </Text>
                ))}
              </View>

              <Text style={[styling.synopsisText, styling.textDetail]}>
                {movie.overview}
              </Text>
            </View>

            {movie?.id && cast.length ? <CastList cast={cast} /> : null}
            <MovieList
              title="Similar Movies"
              data={similarMovies}
              hideSeeAll={true}
            />
          </ScrollView>
        </>
      )}
    </>
  );
}

const styling = StyleSheet.create({
  commonContainer: {
    flex: 1,
    backgroundColor: "rgb(23, 23, 23)",
  },
  safeAreaView: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "bold",
    letterSpacing: 0.8,
    textAlign: "center",
    color: "rgb(243 244 246)",
    paddingHorizontal: 8,
  },
  textDetail: {
    color: "rgb(163 163 163)",
  },
  detailingText: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  synopsisText: {
    textAlign: "justify",
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 16,
    letterSpacing: 0.4,
  },
});
