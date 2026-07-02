import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ChooseAccountTypeScreen from "../screens/ChooseAccountTypeScreen";

import ClientTabNavigator from "./ClientTabNavigator";

import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

  const { authenticated } = useContext(AuthContext);

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {authenticated ? (

          <Stack.Screen
            name="ClientTabs"
            component={ClientTabNavigator}
          />

        ) : (

          <>

            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="ChooseAccountType"
              component={ChooseAccountTypeScreen}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />

          </>

        )}

      </Stack.Navigator>

    </NavigationContainer>

  );
}