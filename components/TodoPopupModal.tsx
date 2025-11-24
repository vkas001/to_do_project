import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Task } from "../lib/task.service";

interface Props {
  visible: boolean;
  group: any;
  taskName: string;
  setTaskName: (v: string) => void;
  selectedTask: Task | null;
  setSelectedTask: (t: Task | null) => void;
  onCancel: () => void;
  onSave: () => void;
  onToggleTask: (taskId: string) => void;
}

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onAddSubtask: (task: Task) => void;
  level?: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onAddSubtask,
  level = 0,
}) => (
  <View style={{ paddingLeft: level * 16, marginVertical: 6 }}>

    {/* Checkbox + Title */}
    <TouchableOpacity
      onPress={() => onToggle(task.$id)}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Feather
        name={task.status ? "check-square" : "square"}
        size={18}
        color={task.status ? "#10B981" : "#9CA3AF"}
        style={{ marginRight: 8 }}
      />

      <Text
        style={{
          color: task.status ? "#9CA3AF" : "#fff",
          textDecorationLine: task.status ? "line-through" : "none",
          fontSize: 16,
        }}
      >
        {task.title}
      </Text>
    </TouchableOpacity>

    {/* Add Subtask */}
    <View style={{ flexDirection: "row", marginTop: 6, alignItems: "center" }}>
      <TouchableOpacity onPress={() => onAddSubtask(task)}>
        <Feather name="plus-circle" size={18} color="#60A5FA" />
      </TouchableOpacity>

      <Text style={{ color: "#9CA3AF", marginLeft: 10 }}>
        {task.subtasks?.length ?? 0} subtasks
      </Text>
    </View>

    {/* Render Subtasks */}
    {task.subtasks?.map((sub) => (
      <TaskItem
        key={sub.$id}
        task={sub}
        onToggle={onToggle}
        onAddSubtask={onAddSubtask}
        level={level + 1}
      />
    ))}
  </View>
);

const TodoPopupModal: React.FC<Props> = ({
  visible,
  group,
  taskName,
  setTaskName,
  selectedTask,
  setSelectedTask,
  onCancel,
  onSave,
  onToggleTask,
}) => {
  if (!group) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "92%",
            backgroundColor: "#111827",
            padding: 16,
            borderRadius: 12,
          }}
        >
          {/* Group Name */}
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            {group.name}
          </Text>

          {/* Tasks List */}
          <View style={{ maxHeight: 320 }}>
            {group.tasks?.length ? (
              group.tasks.map((task: Task) => (
                <TaskItem
                  key={task.$id}
                  task={task}
                  onToggle={onToggleTask}
                  onAddSubtask={(t) => setSelectedTask(t)}
                />
              ))
            ) : (
              <Text style={{ color: "#9CA3AF" }}>No tasks yet</Text>
            )}
          </View>

          <Text style={{ color: "#9CA3AF", marginTop: 8 }}>
            {selectedTask
              ? `Adding subtask to: ${selectedTask.title}`
              : "Add Task Name"}
          </Text>

          {/* Input */}
          <TextInput
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Enter task"
            placeholderTextColor="#888"
            style={{
              backgroundColor: "#1f2937",
              color: "white",
              padding: 10,
              borderRadius: 8,
              marginTop: 8,
            }}
          />

          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedTask(null);
                onCancel();
              }}
            >
              <Text style={{ color: "#9CA3AF" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSave}>
              <Text style={{ color: "#60A5FA", fontWeight: "700" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TodoPopupModal;
