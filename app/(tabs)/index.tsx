import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import AddGroupModal from "../../components/AddGroupModal";
import FloatingButton from "../../components/FloatingButton";
import GroupPopupModal from "../../components/GroupPopupModal";
import TodoCard from "../../components/TodoCard";


const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState<any[]>([]);

  const addGroup = () => {
    if (!groupName.trim()) return;

    const newGroup = {
      id: Date.now().toString(),
      title: groupName,
      completed: false,
    };

    setGroups([...groups, newGroup]);
    setGroupName("");
    setModalVisible(false);
  };

  const toggleComplete = (id: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      )
    );
  };

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [groupPopupVisible, setGroupPopupVisible] = useState(false);

  const openPopup = (group: any) => {
    setSelectedGroup(group);
    setGroupPopupVisible(true);
  };

  return (
    <View className="flex-1 bg-black px-4 pt-12">
      <Text className="text-white text-3xl font-bold text-center mb-6">
        To-Do App
      </Text>

      {groups.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400 text-lg text-base">
            Create your first To-Do
          </Text>
        </View>

      ) : (
        
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          className="mt-4"
          renderItem={({ item }) => (

            <TodoCard
              title={item.title}
              completed={item.completed}
              onToggle={() => toggleComplete(item.id)}
              onDelete={() =>deleteGroup(item.id)}
              onOpen={() => openPopup(item)}
            />

          )}
        />
      )}
      <GroupPopupModal
        visible={groupPopupVisible}
        group={selectedGroup}
        onClose={() => setGroupPopupVisible(false)}
        groupName={groupName}
        setGroupName={setGroupName}
        onAddTask={() => {}}
      />


      <FloatingButton onPress={() => setModalVisible(true)} />

      <AddGroupModal
        visible={modalVisible}
        groupName={groupName}
        setGroupName={setGroupName}
        onCancel={() => setModalVisible(false)}
        onSave={addGroup}
      />
    </View>
  );
};

export default Home;
