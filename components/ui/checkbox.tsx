import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Check } from "react-native-feather";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "web:peer native:h-[20] native:w-[20] native:rounded web:focus-visible:ring-ring border-brand-light web:ring-offset-background z-10 h-4 w-4 shrink-0 rounded-sm border disabled:cursor-not-allowed disabled:opacity-50 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2",
        props.checked && "bg-transparent",
        className,
      )}
      {...props}
    ></CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxV2 = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <View className="relative">
      <Checkbox ref={ref} className={cn("h-3 w-3", className)} {...props} />
      <Check
        width={16}
        height={16}
        strokeWidth={3}
        style={[styles.checkboxV2, !props.checked && styles.hidden]}
        color={"black"}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  checkboxV2: {
    position: "absolute",
    top: 2.5,
    right: 1.75,
    zIndex: 0,
  },
  hidden: {
    display: "none",
  },
});

export { Checkbox, CheckboxV2 };
