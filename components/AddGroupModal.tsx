import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "./CustomInput";

interface Props {
  visible: boolean;
  groupName: string;
  setGroupName: (name: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const AddGroupModal = ({
  visible,
  groupName,
  setGroupName,
  onCancel,
  onSave,

}: Props) => {

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <View className="w-full bg-white rounded-2xl p-6">
          <Text className="text-xl font-semibold mb-4">Add To-Do Group</Text>

          <CustomInput
            label="Group Name"
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Enter your group name"
          />

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              onPress={onCancel}
              className="px-5 py-3 bg-black rounded-xl"
            >
              <Text className="text-white text-base font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSave}
              className="px-6 py-3 bg-black rounded-xl"
            >
              <Text className="text-white text-base font-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddGroupModal;
