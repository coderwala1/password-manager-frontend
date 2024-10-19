export const RouteConstant = {
  ROOT: {
    AUTH: "(auth)",
    PRIVATE: "(private)",
  },
  HOME_NAV: {
    HOME_SCREEN: "home.screen" as const,
    CREATE_PASSWORD: "create-password.screen" as const,
    ALL_CATEGORY: "categories.screen" as const,
    CREATE_CATEGORY: "create-category.screen" as const,
    FAVORITE_PASSWORD: "favorite-password.screen" as const,
    CHANGE_PASSWORD: "change-password.screen" as const,
    ABOUT: "about.screen" as const,
  },
  AUTH_NAV: {
    LOGIN_SCREEN: "login.screen" as const,
    SIGNUP_SCREEN: "signup.screen" as const,
  },
};
