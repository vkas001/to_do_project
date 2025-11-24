
import { getTaskRecursive } from "./task.service";

export const autoCompleteGroup = async (groupId: string) => {
  try {
    const tasks = await getTaskRecursive(groupId);
    
    const count = tasks.length;
    return { count };
  } catch (err) {
    console.warn("autoComplete error", err);
    return null;
  }
};
