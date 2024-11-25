import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { Platform, StyleSheet, View } from "react-native";

interface Props {
  className?: string;
  shadowProps?: {
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
  };
}
const ShadowedCard = ({
  className,
  children,
  shadowProps,
}: Props & PropsWithChildren) => {
  const { elevation, ...iosShadowProps } = shadowProps ?? {};
  const styles = StyleSheet.create({
    shadowProps: {
      ...Platform.select({
        ios: {
          shadowColor: "#171717",
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          ...iosShadowProps,
        },
        android: {
          elevation: elevation ?? 4,
        },
      }),
    },
  });

  return (
    <View
      style={[styles.shadowProps]}
      className={cn("border-foreground/20 bg-background rounded-lg", className)}
    >
      {children}
    </View>
  );
};

export default ShadowedCard;
