import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieScreen from "../screens/MovieScreen";
import HomeScreen from "../screens/HomeScreen";
import PersonScreen from "../screens/PersonScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Person"
          options={{ headerShown: false, animation: "fade_from_bottom" }}
          component={PersonScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
