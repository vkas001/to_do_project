import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "./CustomInput";

interface Props {
  visible: boolean;
  group: any;   
  groupName: string;
  setGroupName: (name: string) => void;
  onClose: () => void;
  onAddTask: () => void;   
}

const GroupPopupModal = ({ 
    visible, 
    group, 
    groupName,
    setGroupName,
    onClose,
    onAddTask     
}: Props) => {

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <View className="w-full bg-white rounded-2xl p-6">

          <Text className="text-xl font-semibold mb-4">
            {group?.title}
          </Text>

          
          <View className="flex-row items-center">
            
          
            <View className="flex-1 mr-3">
              <CustomInput 
                label="Task Name"
                value={groupName}
                onChangeText={setGroupName}
                placeholder="Enter your task list..."
              />
            </View>

           
            <TouchableOpacity
              onPress={onAddTask}
              className="bg-black p-3 rounded-xl"
            >
              <Feather name="plus" size={22} color="white" />
            </TouchableOpacity>
          </View>

         
          <TouchableOpacity
            onPress={onClose}
            className="px-5 py-3 bg-black rounded-xl mt-4"
          >
            <Text className="text-white text-base font-semibold text-center">
              Close
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default GroupPopupModal;
