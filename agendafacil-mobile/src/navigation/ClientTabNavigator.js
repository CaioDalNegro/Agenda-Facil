import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/client/HomeScreen";
import AgendaScreen from "../screens/client/AgendaScreen";
import HistoryScreen from "../screens/client/HistoryScreen";
import ProfileScreen from "../screens/client/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function ClientTabNavigator() {

    return (

        <Tab.Navigator

            screenOptions={{

                headerShown: false,

                tabBarStyle: {

                    backgroundColor: "#1A1A1A",
                    borderTopColor: "#333",
                    height: 72,
                    paddingBottom: 8,
                    paddingTop: 8,

                },

                tabBarActiveTintColor: "#D4AF37",

                tabBarInactiveTintColor: "#8A8A8A",

                tabBarLabelStyle: {

                    fontSize: 12,
                    fontWeight: "600",

                }

            }}

        >

            <Tab.Screen

                name="Home"

                component={HomeScreen}

                options={{

                    tabBarIcon: ({ color, size }) => (

                        <Feather
                            name="home"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

            <Tab.Screen

                name="Agenda"

                component={AgendaScreen}

                options={{

                    tabBarIcon: ({ color, size }) => (

                        <MaterialCommunityIcons
                            name="calendar-outline"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

            <Tab.Screen

                name="Histórico"

                component={HistoryScreen}

                options={{

                    tabBarIcon: ({ color, size }) => (

                        <MaterialCommunityIcons
                            name="history"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

            <Tab.Screen

                name="Perfil"

                component={ProfileScreen}

                options={{

                    tabBarIcon: ({ color, size }) => (

                        <Feather
                            name="user"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

        </Tab.Navigator>

    );

}