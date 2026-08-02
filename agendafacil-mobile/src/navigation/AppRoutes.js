import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ChooseAccountTypeScreen from "../screens/auth/ChooseAccountTypeScreen";
import BarberRegisterScreen from "../screens/barber/BarberRegisterScreen";
import BarberScheduleScreen from "../screens/barber/BarberScheduleScreen";
import RegisterSuccessScreen from "../screens/barber/RegisterSuccessScreen";
import BarbershopRegisterScreen from "../screens/barbershop/BarbershopRegisterScreen";
import BarbershopScheduleScreen from "../screens/barbershop/BarbershopScheduleScreen";
import RegisterBarbershopSuccessScreen from "../screens/barbershop/RegisterBarbershopSuccessScreen";

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
              name="BarberRegister"
              component={BarberRegisterScreen}
            />

            <Stack.Screen
              name="BarberScheduleScreen"
              component={BarberScheduleScreen}
            />

            <Stack.Screen
              name="RegisterSuccessScreen"
              component={RegisterSuccessScreen}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />

            <Stack.Screen
              name="BarbershopRegister"
              component={BarbershopRegisterScreen}
            />

            <Stack.Screen 
              name="BarbershopScheduleScreen"
              component={BarbershopScheduleScreen}
            />

            <Stack.Screen
              name="RegisterBarbershopSuccessScreen"
              component={RegisterBarbershopSuccessScreen}
            />

          </>

        )}

      </Stack.Navigator>

    </NavigationContainer>

  );
}
