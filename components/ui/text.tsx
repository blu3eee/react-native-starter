import * as Slot from "@rn-primitives/slot";
import { SlottableTextProps, TextRef } from "@rn-primitives/types";
import { Text as RNText } from "react-native";
import { View } from "react-native";
import { cn, openExternalLink } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { Linking } from "react-native";

const TextClassContext = React.createContext<
  { className?: string; externalTextClassName?: string } | undefined
>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "text-foreground text-base font-normal web:select-text",
          textClass?.className,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

const isValidUrl = (string: string): boolean => {
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  return urlPattern.test(string);
};

const isPhoneNumber = (string: string) => {
  const phoneRegex = /^(1[-\s.]?)?\(?[2-9]\d{2}\)?[-\s.]?\d{3}[-\s.]?\d{4}$/;
  return phoneRegex.test(string);
};

const SmartTextParser = ({ item }: { item: string }) => {
  if (typeof item !== "string") {
    return null;
  }

  const parts = item.split(/(\*\*.*?\*\*)/).filter(Boolean);

  return (
    <Text>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={index} className="font-bold">
              {part.slice(2, -2)}{" "}
            </Text>
          );
        } else {
          const words = part.split(/\s+/).filter((word) => word.length > 0);
          return words.map((word, wordIndex) => {
            if (isValidUrl(word)) {
              return (
                <ExternalLinkText key={`${index}-${wordIndex}`} link={word}>
                  {word}{" "}
                </ExternalLinkText>
              );
            } else if (isPhoneNumber(word.replace(".", "").replace(" ", ""))) {
              return (
                <PhoneNumberText
                  key={`${index}-${wordIndex}`}
                  phoneNumber={word}
                >
                  {word}{" "}
                </PhoneNumberText>
              );
            } else {
              return `${word} `;
            }
          });
        }
      })}
    </Text>
  );
};

type ItemBaseType = string | React.ReactNode;
export type SmartTextItemType = ItemBaseType | ItemBaseType[];

const SmartText = ({
  item,
  level,
}: {
  item: SmartTextItemType;
  level: number;
}) => {
  if (typeof item === "string") {
    return <SmartTextParser item={item} />;
  }

  if (Array.isArray(item)) {
    return (
      <View
        className={"flex-col"}
        style={{
          gap: level === 0 ? 12 : Math.max(Math.round(6 / level), 1),
          paddingLeft: Math.min(48, level * 8),
        }}
      >
        {item.map((innerItem, index) => (
          <SmartText item={innerItem} level={level + 1} key={index} />
        ))}
      </View>
    );
  }
  return item;
};

const ExternalLinkText = ({
  className,
  link,
  children,
}: { className?: string; link: string } & PropsWithChildren) => {
  const textClass = React.useContext(TextClassContext);

  return (
    <Text
      className={cn(
        "text-brand underline",
        textClass?.externalTextClassName,
        className,
      )}
      onPress={(e) => {
        openExternalLink(e, link);
      }}
      accessibilityRole="link"
    >
      {children ?? link}
    </Text>
  );
};

const PhoneNumberText = ({
  className,
  phoneNumber,
  children,
}: { className?: string; phoneNumber: string } & PropsWithChildren) => {
  const textClass = React.useContext(TextClassContext);
  return (
    <Text
      className={cn(
        "text-brand underline",
        textClass?.externalTextClassName,
        className,
      )}
      onPress={(e) => {
        Linking.openURL(`tel:${cleanUpPhoneNumber(phoneNumber)}`);
      }}
      accessibilityRole="link"
    >
      {children ?? phoneNumber}
    </Text>
  );
};

function cleanUpPhoneNumber(number: string): string {
  return number.replace(/\D/g, "");
}

export {
  Text,
  TextClassContext,
  SmartTextParser,
  SmartText,
  ExternalLinkText,
  PhoneNumberText,
};
