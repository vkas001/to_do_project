import { Plus } from "lucide-react-native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todoGroups: any[] = []; // temporary placeholder

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-5">
      {/* Header */}
      <View className="w-full pt-4 pb-2">
        <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          To-Do App
        </Text>
      </View>

      {/* Empty State */}
      {todoGroups.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-400">No To-Do Groups Yet</Text>
          <Text className="text-sm text-gray-500 mt-1">
            Tap the + button to create one
          </Text>
        </View>
      ) : (
        <FlatList
          data={todoGroups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity className="p-4 mb-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </Text>
              <Text className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                {item.tasks.length} Tasks
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-10 right-6 bg-red-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => console.log("Add new group")}
      >
        <Plus color="black" size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
