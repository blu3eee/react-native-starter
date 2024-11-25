import * as React from "react";
import { View } from "react-native";

import { cn } from "@/lib/utils";

interface Props {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}
export const Progress = ({
  className,
  value,
  max = 100,
  indicatorClassName,
}: Props) => {
  return (
    <View
      className={cn(
        "bg-secondary h-4 w-full overflow-hidden rounded-full",
        className,
      )}
    >
      <View
        className={cn(
          "bg-brand-secondary h-full w-full",
          max === value && "bg-brand",
          indicatorClassName,
        )}
        style={{
          width: `${(100 * value) / max}%`,
        }}
      />
    </View>
  );
};
