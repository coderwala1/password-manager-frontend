import { TailwindColor } from "@/config/color.config";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
  ViewProps,
} from "react-native";

type IVariantStyle = "primary" | "fill" | "outline" | "yellow" | "danger";

const variantBtnBgStyles = {
  primary: "bg-primary-500 disabled:opacity-80",
  fill: "bg-gray-300 dark:bg-gray-600 disabled:bg-gray-300",
  yellow: "bg-[#FDF541] dark:bg-[#FDF541] disabled:bg-gray-300",
  outline: "bg-transparent border border-[#EEEEEE] disabled:bg-gray-300",
  danger: "bg-red-600 border border-[#EEEEEE] disabled:bg-gray-300",
};

const variantBtnTextStyles = {
  primary: "text-gray-100",
  fill: "text-gray-600 dark:text-gray-300",
  yellow: "text-gray-900",
  outline: "text-primary-500 dark:text-gray-300",
  danger: "text-white",
};

const variantSizeStyles = {
  default: "py-3.5",
  small: "py-2",
  xs: "py-1.5",
};

interface IMyButton extends ViewProps {
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  size?: "default" | "small" | "xs";
  variant?: IVariantStyle;
  title: string;
  zIndex?: number;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onPress: () => void;
}
export default function MyButton({
  title,
  size = "default",
  disabled = false,
  loading = false,
  variant = "primary",
  style,
  onPress,
  iconLeft,
  iconRight,
  zIndex = -1,
  rounded = false,
  fullWidth = false,
}: IMyButton) {
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={() => onPress()}
      style={[style, { zIndex: zIndex }]}
      className={`${fullWidth ? "w-full " : "w-auto"} overflow-hidden ${
        Number(Platform.Version) < 28 ? "px-1" : "px-4"
      } ${variantSizeStyles[size]} ${
        rounded ? "rounded-[40px]" : size === "xs" ? "rounded-md" : "rounded-lg"
      }  ${variantBtnBgStyles[variant]} justify-center`}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "fill" || variant === "outline"
              ? TailwindColor.primary[500]
              : TailwindColor.gray[100]
          }
          size={22}
        />
      ) : (
        <View className="flex flex-row space-x-2 justify-between items-center">
          <View>{iconLeft && iconLeft}</View>
          <Text
            className={`${
              size === "xs" ? "text-small" : "text-body"
            }  font-semibold text-center ${
              disabled ? "opacity-80" : variantBtnTextStyles[variant]
            } `}
          >
            {title}
          </Text>
          <View>{iconRight && iconRight}</View>
        </View>
      )}
    </Pressable>
  );
}
