import cn from "clsx";
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface CustomInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-11/12 self-center mt-6">
      
      {/* Label */}
      <Text
        className={cn(
          "text-base font-semibold mb-2 ml-1",
          isFocused ? "text-black" : "text-gray-700"
        )}
      >
        {label}
      </Text>

      {/* Input */}
      <TextInput
        style={{ paddingHorizontal: 16, paddingVertical: 14 }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full px-4 py-4 rounded-xl text-base bg-white shadow-sm border",
          isFocused ? "border-black" : "border-gray-300"
        )}
      />
    </View>
  );
};

export default CustomInput;
