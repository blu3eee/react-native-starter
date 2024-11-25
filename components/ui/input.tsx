import * as React from "react";
import { TextInput, View } from "react-native";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeOff } from "react-native-feather";
import { Text } from "./text";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(
  (
    { className, placeholderClassName, onFocus, onBlur, style, ...props },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
      <TextInput
        ref={ref}
        className={cn(
          "native:h-12 native:text-lg native:leading-[1.25] placeholder:text-muted-foreground web:focus-visible:ring-ring border-foreground/20 bg-background text-foreground web:ring-offset-background h-10 rounded-md border px-3 text-base file:border-0 file:bg-transparent file:font-medium web:flex web:w-full web:py-2 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2 lg:text-sm",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          className,
        )}
        placeholderClassName={cn("text-foreground/30", placeholderClassName)}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) {
            onFocus(e);
          }
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) {
            onBlur(e);
          }
        }}
        style={[
          isFocused
            ? {
                shadowColor: "#171717",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 2,
              }
            : {},
          style,
        ]}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled =
    props.value === "" || props.value === undefined || props["aria-disabled"];

  return (
    <View className="relative">
      <Input
        secureTextEntry={!showPassword}
        className={cn("hide-password-toggle pr-12", className)}
        ref={ref}
        {...props}
      />
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 opacity-60 hover:bg-transparent hover:text-inherit hover:opacity-100"
        onPress={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <Eye className="h-4 w-4" color={"#235992"} aria-hidden={true} />
        ) : (
          <EyeOff className="h-4 w-4" color={"#235992"} aria-hidden={true} />
        )}
        <Text className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </Text>
      </Button>
    </View>
  );
});
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
