import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false, // true
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

export const QUERY_KEYS = {
  CURRENT_USER: "qk-get-current-user",
  GET_CATEGORY: "qk-get-category",
  GET_ALL_PASSWORDS: "qk-get-all-passwords",
  GET_ALL_FAV_PASSWORDS: "qk-get-all-fav-passwords",
};
