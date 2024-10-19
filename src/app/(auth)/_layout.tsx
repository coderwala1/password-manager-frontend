import { RouteConstant } from "@/constants/route.constant";
import { useUserStore } from "@/hooks/user.store";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const user = useUserStore((s) => s.user);

  if (user) {
    return <Redirect href={RouteConstant.HOME_NAV.HOME_SCREEN} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteConstant.AUTH_NAV.LOGIN_SCREEN} />
    </Stack>
  );
}
