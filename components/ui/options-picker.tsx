import React, { useRef, useCallback, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  Keyboard,
  ViewStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Text } from "./text";

export interface PickerOption {
  label: string;
  value: string;
}

interface OptionsPickerProps {
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  options: PickerOption[];
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const { height: PAGE_HEIGHT } = Dimensions.get("window");
export interface OptionsPickerHandle {
  open: () => void;
  close: () => void;
}

const OptionsPicker = ({
  selectedValue,
  onValueChange,
  options,
  placeholder = "Select an option",
  disabled,
  style,
}: OptionsPickerProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const pickerRef = useRef<Picker<string> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openPicker = useCallback(() => {
    Keyboard.dismiss();
    if (Platform.OS === "android") {
      pickerRef.current?.focus();
    } else {
      bottomSheetModalRef.current?.present();
    }
    setIsOpen(true);
  }, [isOpen]);

  const closePicker = useCallback(() => {
    setIsOpen(false);
    bottomSheetModalRef.current?.dismiss();
  }, [isOpen]);

  const handleValueChange = useCallback(
    (itemValue: string, itemIndex: number) => {
      onValueChange(itemValue, itemIndex);
    },
    [onValueChange, closePicker],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style, { backgroundColor: "#000" }]}
        opacity={0.5}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  const renderPicker = () => {
    return (
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        numberOfLines={2}
        enabled={!disabled}
      >
        {options.map((option) => (
          <Picker.Item
            label={option.label}
            value={option.value}
            key={option.value}
          />
        ))}
      </Picker>
    );
  };

  if (Platform.OS === "android") {
    return (
      <View
        className="border-foreground/20 rounded-lg border"
        style={[
          isOpen
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
      >
        {renderPicker()}
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity onPress={openPicker}>
        <View
          className="border-foreground/20 bg-background justify-center rounded-lg border px-4 py-3"
          style={[
            isOpen
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
        >
          <Text>
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : placeholder}
          </Text>
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={true}
        maxDynamicContentSize={PAGE_HEIGHT / 2}
        handleStyle={{ backgroundColor: "#171717" }}
        handleIndicatorStyle={{ backgroundColor: "#171717" }}
        backdropComponent={renderBackdrop}
        onDismiss={closePicker}
      >
        <BottomSheetView className="bg-secondary">
          {renderPicker()}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default OptionsPicker;
