import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  groupName: string;
  setGroupName: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const AddGroupModal: React.FC<Props> = ({ visible, groupName, setGroupName, onCancel, onSave }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "90%", backgroundColor: "#111827", padding: 16, borderRadius: 12 }}>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 8 }}>New Todo Group</Text>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Group name"
            placeholderTextColor="#888"
            style={{ backgroundColor: "#1f2937", color: "white", padding: 10, borderRadius: 8 }}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
            <TouchableOpacity onPress={onCancel}><Text style={{ color: "#9CA3AF" }}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={onSave}><Text style={{ color: "#60A5FA", fontWeight: "600" }}>Save</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddGroupModal;
