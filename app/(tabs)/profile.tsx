import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { currentUser, logout, updateUserProfile } from "../../lib/_appwrite";
console.log("profile function:",logout);

const Profile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const u = await currentUser();
      setUser(u);
      setNameInput(u?.name ?? "");

    } catch (err) {
      console.error("Failed to load user", err);
      Alert.alert("Error", "Could not load user. Please login again.");

    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Logout error", err);
      Alert.alert("Error", "Failed to logout. Try again.");
    }
  };

  const onSaveName = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      Alert.alert("Validation", "Name cannot be empty.");
      return;
    }

    try {

      setIsLoading(true);
      await updateUserProfile(user.$id, trimmed, user.avatar);
     
      await loadUser();
      setEditing(false);
      Alert.alert("Success", "Name updated.");

    } catch (err) {

      console.error("Failed to update name", err);
      Alert.alert("Error", "Could not update name.");

    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {

    return (

      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {

    return (
      
      <View className="flex-1 bg-black justify-center items-center p-6">
        <Text className="text-white text-lg mb-3">Not signed in</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/sign-in")}
          className="px-6 py-3 bg-white rounded-xl"
        >
          <Text className="text-black font-semibold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  
  const initials = (user.name || user.email || "U")
    .split(" ")
    .map((s: string) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View className="flex-1 bg-black p-6">
      <View className="items-center mt-8">
        <View className="w-28 h-28 rounded-full bg-neutral-800 justify-center items-center mb-4">
          <Text className="text-white text-3xl font-bold">{initials}</Text>
        </View>

        {editing ? (
          <View className="w-full px-6">
            <Text className="text-gray-300 mb-2">Display name</Text>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Your name"
              placeholderTextColor="#888"
              className="bg-neutral-900 text-white p-3 rounded-xl"
            />
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => {
                  setEditing(false);
                  setNameInput(user.name ?? "");
                }}
                className="px-4 py-3 bg-neutral-800 rounded-xl"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onSaveName}
                className="px-4 py-3 bg-blue-600 rounded-xl"
              >
                <Text className="text-white font-semibold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text className="text-white text-xl font-semibold">{user.name ?? "No name"}</Text>
            <Text className="text-gray-400 mt-1">{user.email}</Text>

            <View className="w-full px-6 mt-6">
              <Text className="text-gray-400">Member since</Text>
              <Text className="text-white mt-1">
                {user.$createdAt ? new Date(user.$createdAt).toLocaleString() : "Unknown"}
              </Text>

              <View className="flex-row justify-between mt-8">
                <TouchableOpacity
                  onPress={() => setEditing(true)}
                  className="px-4 py-3 bg-neutral-800 rounded-xl"
                >
                  <Text className="text-white">Edit Name</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onLogout}
                  className="px-4 py-3 bg-red-600 rounded-xl"
                >
                  <Text className="text-white font-semibold">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Profile;
