import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

  const { authenticated } = useContext(AuthContext);

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {
          authenticated ? (

            <Stack.Screen name="Home" component={HomeScreen} />

          ) : (

            <>
              <Stack.Screen name="Login" component={LoginScreen} />

              <Stack.Screen name="Register" component={RegisterScreen} />
            </>

          )
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}