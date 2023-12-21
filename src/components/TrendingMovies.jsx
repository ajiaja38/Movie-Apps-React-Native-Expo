import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image500 } from "../api/data/imagePath";

const { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  return (
    <View className="mb-8">
      <Text className="text-white font-bold text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} />}
        firstItem={0}
        inactiveSlideOpacity={0.4}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
      />
    </View>
  );
}

const MovieCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Movie", item)}
    >
      <Image
        source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
