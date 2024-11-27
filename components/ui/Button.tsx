import { cn } from "@/lib/utils";
import React from "react";
import { TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

const Button = ({
  children,
  className,
  style,
  ...props
}: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: "#A1CEDC",
          borderRadius: 8,
          alignSelf: "center",
        },
        style,
      ]}
      className={cn("", className)}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
