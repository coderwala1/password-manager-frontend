import MyModal from "@/components/common/my-modal";
import MyStatusBar from "@/components/common/my-status-bar";
import AuthWrapper from "@/components/layout/auth-layout";
import { queryClient } from "@/config/query.config";
import { RouteConstant } from "@/constants/route.constant";
import { useGlobalModal } from "@/hooks/global-modal.store";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundaryProps, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Button, Platform, Text, View } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import "../global.css";

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View>
      <Text>{props.error.message}</Text>
      <Button onPress={props.retry} title="Try Again" />
    </View>
  );
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const modal = useGlobalModal();

  useEffect(() => {
    setTimeout(SplashScreen.hideAsync, 0);
  }, []);

  if (Platform.OS === "web") {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <AuthWrapper>
            <MyStatusBar />
            <MyModal {...modal} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name={RouteConstant.ROOT.AUTH} />
              <Stack.Screen name={RouteConstant.ROOT.PRIVATE} />
            </Stack>
          </AuthWrapper>
        </QueryClientProvider>
      </>
    );
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AlertNotificationRoot theme="dark">
          <AuthWrapper>
            <MyStatusBar />
            <MyModal {...modal} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name={RouteConstant.ROOT.AUTH} />
              <Stack.Screen name={RouteConstant.ROOT.PRIVATE} />
            </Stack>
          </AuthWrapper>
        </AlertNotificationRoot>
      </QueryClientProvider>
    </>
  );
}
