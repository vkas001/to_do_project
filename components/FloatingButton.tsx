import React from "react";
import { Text, TouchableOpacity } from "react-native";

const FloatingButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: "#2563EB",
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      margin: 16,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6
    }}>
      <Text style={{ color: "white", fontSize: 28 }}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
