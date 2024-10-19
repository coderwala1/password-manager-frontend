import { CustomDrawerContent } from "@/components/layout/custom-drawer-content";
import { TailwindColor } from "@/config/color.config";
import { RouteConstant } from "@/constants/route.constant";
import {
  LobsterTwo_400Regular,
  useFonts,
} from "@expo-google-fonts/lobster-two";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    LobsterTwo_400Regular,
  });

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const items = [
    {
      title: "Create Password",
      icon: <Feather name="lock" size={24} color={TailwindColor.primary[50]} />,
      name: RouteConstant.HOME_NAV.CREATE_PASSWORD,
      drawerLabel: "Create Password",
    },
    {
      title: "All Category",
      icon: (
        <Entypo name="attachment" size={24} color={TailwindColor.primary[50]} />
      ),
      name: RouteConstant.HOME_NAV.ALL_CATEGORY,
      drawerLabel: "All Category",
    },
    {
      title: "Create Category",
      icon: (
        <MaterialCommunityIcons
          name="playlist-plus"
          size={24}
          color={TailwindColor.primary[50]}
        />
      ),
      name: RouteConstant.HOME_NAV.CREATE_CATEGORY,
      drawerLabel: "Create Category",
    },
    {
      title: "Favorite Password",
      icon: (
        <Entypo
          name="heart-outlined"
          size={24}
          color={TailwindColor.primary[50]}
        />
      ),
      name: RouteConstant.HOME_NAV.FAVORITE_PASSWORD,
      drawerLabel: "Favorite Password",
    },
    {
      title: "Change Password",
      icon: (
        <MaterialCommunityIcons
          name="circle-edit-outline"
          size={24}
          color={TailwindColor.primary[50]}
        />
      ),
      name: RouteConstant.HOME_NAV.CHANGE_PASSWORD,
      drawerLabel: "Change Password",
    },
    {
      title: "About",
      icon: (
        <AntDesign
          name="customerservice"
          size={24}
          color={TailwindColor.primary[50]}
        />
      ),
      name: RouteConstant.HOME_NAV.ABOUT,
      drawerLabel: "About",
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerLeft: () => (
            <FontAwesome
              name="angle-left"
              size={30}
              color={TailwindColor.primary[50]}
              onPress={() => navigation.goBack()}
              className="px-8"
            />
          ),
          headerTitleStyle: {
            color: TailwindColor.primary[50],
          },
          headerStyle: {
            backgroundColor: TailwindColor.gray[900],
          },
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: TailwindColor.gray[900],
          },
          drawerInactiveTintColor: TailwindColor.primary[50],
          drawerActiveTintColor: TailwindColor.primary[50],
          drawerActiveBackgroundColor: "none",
          drawerLabelStyle: { marginLeft: -15 },
        }}
      >
        <Drawer.Screen
          name={RouteConstant.HOME_NAV.HOME_SCREEN} // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            headerTitleAlign: "center",
            title: "Passwordz",
            headerTitleStyle: {
              fontFamily: !fontsLoaded ? "" : "LobsterTwo_400Regular",
              fontSize: 28,
              color: TailwindColor.primary[50],
            },
            headerLeft: () => (
              <Feather
                name="settings"
                size={24}
                color={TailwindColor.primary[50]}
                onPress={() => toggleDrawer()}
                className="px-6"
              />
            ),
            headerRight: () => (
              <Feather
                name="search"
                size={24}
                color={TailwindColor.primary[50]}
                onPress={() => toggleDrawer()}
                className="px-6"
              />
            ),
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        {items.map((menu) => (
          <Drawer.Screen
            key={menu.name}
            name={menu.name} // This is the name of the page and must match the url from root
            options={{
              drawerLabel: menu.drawerLabel,
              title: menu.title,
              headerTitleAlign: "center",
              drawerIcon: () => menu.icon,
            }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}
