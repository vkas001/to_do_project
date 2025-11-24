import { ID } from "react-native-appwrite";
import { appwriteConfig, databases } from "./_appwrite";

const { databaseId, groupCollectionId } = appwriteConfig;

export const createGroup = async (name: string, userId: string) => {
  return await databases.createDocument(databaseId, groupCollectionId, ID.unique(), {
    name,
    status: false,
    userId,
  });
};

export const getGroups = async (userId?: string) => {
 
  const filters: any[] = [];
  if (userId) {
    
  }
  return await databases.listDocuments(databaseId, groupCollectionId, filters);
};

export const updateGroupStatus = async (groupId: string, status: boolean) => {
  return await databases.updateDocument(databaseId, groupCollectionId, groupId, { status });
};

export const deleteGroup = async (groupId: string) => {
  return await databases.deleteDocument(databaseId, groupCollectionId, groupId);
};
