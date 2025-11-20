import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
}

const FloatingButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-10 right-10 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-xl"
    >
      <Ionicons name="add" size={36} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;
