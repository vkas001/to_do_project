import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
import AddGroupModal from "../../components/AddGroupModal";
import FloatingButton from "../../components/FloatingButton";
import TodoCard from "../../components/TodoCard";
import TodoPopupModal from "../../components/TodoPopupModal";
import { currentUser } from "../../lib/_appwrite";
import { autoCompleteGroup } from "../../lib/autoComplete";
import {
  createGroup,
  deleteGroup as deleteGroupDB,
  getGroups,
  updateGroupStatus,
} from "../../lib/group.service";
import {
  createTask,
  deleteTasksByGroup,
  getTaskRecursive,
  Task,
  updateTaskStatus,
} from "../../lib/task.service";

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupPopupVisible, setGroupPopupVisible] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [taskName, setTaskName] = useState("");

  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const u = await currentUser();
      setUser(u);
      if (u) loadGroups(u.$id);
    } catch (err) {
      console.warn("loadUser error", err);
    }
  };

  const loadGroups = async (userId?: string) => {
    try {
      const res = await getGroups(userId);
      const groupsWithTasks = await Promise.all(
        res.documents.map(async (g: any) => {
          const tasks = await getTaskRecursive(g.$id);
          return { ...g, tasks, tasksCount: tasks.length };
        })
      );
      setGroups(groupsWithTasks);
    } catch (err) {
      console.warn("loadGroups error", err);
    }
  };

  const openPopup = async (group: any) => {
    const tasks = await getTaskRecursive(group.$id);
    setSelectedGroup({ ...group, tasks });
    setTaskName("");
    setSelectedTask(null);
    setGroupPopupVisible(true);
  };

  const addGroupHandler = async () => {
    if (!groupName.trim() || !user) return;
    await createGroup(groupName, user.$id);
    setGroupName("");
    setModalVisible(false);
    loadGroups(user.$id);
  };

  const addTaskToGroup = async () => {
    if (!taskName.trim() || !selectedGroup || !user) return;

    const parentId = selectedTask?.$id ?? null;
    await createTask(taskName, selectedGroup.$id, user.$id, parentId);

    const tasks = await getTaskRecursive(selectedGroup.$id);
    setSelectedGroup({ ...selectedGroup, tasks });
    setTaskName("");
    setSelectedTask(null);

    await autoCompleteGroup(selectedGroup.$id);
    loadGroups(user.$id);
  };

  const toggleTask = async (taskId: string) => {
    const findTask = (list: Task[]): Task | null => {
      for (const t of list) {
        if (t.$id === taskId) return t;
        if (t.subtasks?.length) {
          const found = findTask(t.subtasks);
          if (found) return found;
        }
      }
      return null;
    };

    const t = findTask(selectedGroup?.tasks ?? []);
    if (!t) return;

    await updateTaskStatus(taskId, !t.status);

    const tasks = await getTaskRecursive(selectedGroup.$id);
    setSelectedGroup({ ...selectedGroup, tasks });

    await autoCompleteGroup(selectedGroup.$id);
    loadGroups(user.$id);
  };

  const toggleGroup = async (groupId: string) => {
    const g = groups.find((x) => x.$id === groupId);
    if (!g) return;
    await updateGroupStatus(groupId, !g.status);
    loadGroups(user.$id);
  };

  const deleteGroupHandler = async (groupId: string, status: boolean) => {
    if (!status) return;
    await deleteTasksByGroup(groupId);
    await deleteGroupDB(groupId);
    loadGroups(user.$id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      
      {/* Header */}
      <View
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 10,
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            textAlign: "center",
            marginBottom: 10,
            fontWeight: "700",
            letterSpacing: 0.5,
          }}
        >
          To-Do App
        </Text>
      </View>

      {/* Body */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 180,
          paddingHorizontal: 18,
        }}
        showsVerticalScrollIndicator={false}
      >
        {groups.length === 0 ? (
          <View
            style={{
              width: "100%",
              height: 280,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#6B7280", fontSize: 16 }}>
              Create your first To-Do Group
            </Text>
          </View>
        ) : (
          groups.map((item) => (
            <View key={item.$id} style={{ marginBottom: 14 }}>
              <TodoCard
                title={item.name}
                completed={item.status}
                taskCount={item.tasksCount ?? 0}
                onToggle={() => toggleGroup(item.$id)}
                onDelete={() => deleteGroupHandler(item.$id, item.status)}
                onOpen={() => openPopup(item)}
              />
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Button */}
      <View style={{ position: "absolute", bottom: 115, right: 20 }}>
        <FloatingButton onPress={() => setModalVisible(true)} />
      </View>

      {/* Modals */}
      <TodoPopupModal
        visible={groupPopupVisible}
        group={selectedGroup}
        taskName={taskName}
        setTaskName={setTaskName}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        onCancel={() => setGroupPopupVisible(false)}
        onSave={addTaskToGroup}
        onToggleTask={toggleTask}
      />

      <AddGroupModal
        visible={modalVisible}
        groupName={groupName}
        setGroupName={setGroupName}
        onCancel={() => setModalVisible(false)}
        onSave={addGroupHandler}
      />
    </SafeAreaView>
  );
};

export default Home;
