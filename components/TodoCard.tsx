// components/TodoCard.tsx
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  completed: boolean;
  taskCount: number;
  onToggle: () => void;
  onDelete: () => void;
  onOpen: () => void;
}

const TodoCard: React.FC<Props> = ({
  title,
  completed,
  taskCount,
  onToggle,
  onDelete,
  onOpen,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onOpen}
      style={{
        backgroundColor: "#111827",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
        {title}
      </Text>
      <Text style={{ color: "#9CA3AF", marginTop: 4 }}>
        {taskCount} tasks
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        {/* Checkbox Toggle */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation(); // prevents card click
            onToggle();
          }}
        >
          <Feather
            name={completed ? "check-square" : "square"}
            size={22}
            color={completed ? "#10B981" : "#9CA3AF"}
          />
        </TouchableOpacity>

        {/* Delete Icon */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Feather name="trash-2" size={22} color="#F87171" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TodoCard;
