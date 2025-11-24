import { ID, Query } from "react-native-appwrite";
import { appwriteConfig, databases } from "./_appwrite";

const { databaseId, taskCollectionId } = appwriteConfig;

export interface Task {
  $id: string;
  title: string;
  status: boolean;
  groupId: string;
  parentTaskId?: string;
  subtasks?: Task[];
}


export const createTask = async (
  title: string,
  groupId: string,
  userId: string,
  parentTaskId?: string | null
) => {
  
  const parent = parentTaskId ?? "";
  return await databases.createDocument(databaseId, taskCollectionId, ID.unique(), {
    title,
    status: false,
    groupId,
    userId,
    parentTaskId: parent,
  });
};


export const getTaskRecursive = async (
  groupId: string,
  parentTaskId: string | null = null

): Promise<Task[]> => {

  const parentFilter = parentTaskId === null ? "" : parentTaskId;
  const res = await databases.listDocuments(databaseId, taskCollectionId, [
    Query.equal("groupId", groupId),
    Query.equal("parentTaskId", parentFilter),
  ]);

  const tasksWithSubtasks: Task[] = await Promise.all(
    res.documents.map(async (doc: any) => {
      const task: Task = {
        $id: doc.$id,
        title: (doc as any).title ?? "",
        status: (doc as any).status ?? false,
        groupId: (doc as any).groupId ?? "",
        parentTaskId: (doc as any).parentTaskId ?? "",
        subtasks: [],
      };

   
      task.subtasks = await getTaskRecursive(groupId, task.$id);
      return task;
    })
  );

  return tasksWithSubtasks;
};

export const updateTaskStatus = async (taskId: string, status: boolean) => {
  return await databases.updateDocument(databaseId, taskCollectionId, taskId, { status });
};

export const deleteTask = async (taskId: string) => {
  return await databases.deleteDocument(databaseId, taskCollectionId, taskId);
};


export const deleteTasksByGroup = async (groupId: string) => {
  const tasks = await getTaskRecursive(groupId);

  const deleted: string[] = [];
  const errors: any[] = [];

  const deleteRec = async (items: Task[]) => {
    for (const t of items) {
      try {
        if (t.subtasks && t.subtasks.length) await deleteRec(t.subtasks);
        await deleteTask(t.$id);
        deleted.push(t.$id);
      } catch (err) {
        errors.push({ id: t.$id, error: err });
      }
    }
  };

  await deleteRec(tasks);
  return { deletedCount: deleted.length, errors };
};
