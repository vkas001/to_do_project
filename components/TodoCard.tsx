import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onOpen: () => void;
}

const TodoCard = ({ title, completed, onToggle, onDelete, onOpen }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onOpen}
      className="bg-white/10 px-4 py-5 rounded-xl mb-4 flex-row items-center"
    >
      {/* LEFT CHECKBOX */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();   // stops triggering card onPress
          onToggle();
        }}
        className={`w-6 h-6 rounded-md border-2 mr-4 
          ${completed ? "bg-green-500 border-green-500" : "border-white"}
        `}
      />

      {/* TITLE */}
      <Text
        className={`text-white text-lg flex-1 ${
          completed ? "line-through text-gray-400" : ""
        }`}
      >
        {title}
      </Text>

      {/* DELETE ICON */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();   // stops card onPress
          onDelete();
        }}
      >
        <Feather name="trash-2" size={22} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TodoCard;
