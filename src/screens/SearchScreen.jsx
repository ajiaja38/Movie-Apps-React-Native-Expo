import React, { useCallback, useState } from "react";
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
import Loading from "../components/Loading";
import { debounce } from "lodash";
import MovieAPI from "../api/data";
import { fallbackMoviePoster, image500 } from "../api/data/imagePath";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const movieName = "Avengers: Infinity War";

  const handleSearch = (value) => {
    if (value.length > 2) {
      setIsLoading(true);
      setTimeout(async () => {
        const response = await MovieAPI.searchMovies(value);
        if (response && response.results) setResult(response.results);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
      setResult([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
          onChangeText={handleTextDebounce}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={28} strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loading />
      ) : result.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text style={{ color: "white", fontWeight: 600, marginLeft: 4 }}>
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
                    source={{
                      uri: image500(item.poster_path) || fallbackMoviePoster,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text
                    style={{
                      color: "rgb(212 212 212)",
                      textAlign: "center",
                      marginLeft: 4,
                    }}
                  >
                    {item.title.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-col pt-28 items-center justify-center">
          <Image
            source={require("../../assets/not-found.png")}
            className="h-72 w-72"
          />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginTop: 12,
              fontSize: 24,
              lineHeight: 32,
            }}
          >
            Please enter a movie name...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
