import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

interface CreateUserParams {
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    password: string;
}

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.todoapp",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: "691d6fb50037fd586db5",

    // you must replace these with real IDs from Appwrite UI
    userCollectionId: "791d6fb50_037fd586db5",
    groupCollectionId: "3s2d1f5we41f153edf1",
    taskCollectionId: "5d4f654sd8f48sd4f4d",
};


export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);


export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl,
            }
        );
    } catch (e) {
        throw new Error(String(e));
    }
};


export const signIn = async ({ email, password }: SignInParams) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(String(e));
    }
};




export const currentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const userDoc = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        return userDoc.documents[0];
    } catch (e) {
        console.log("currentUser error:", e);
        throw new Error(String(e));
    }
    
    
};

export const logout = async () => {
  try {
    return await account.deleteSession("current");
    
  } catch (err) {
    console.warn("logout error", err);
    throw err;
  }
};


export const updateUserProfile = async (userId: string, name: string, avatar: string) => {
  try {
  
    await account.updateName(name);

  
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        name,
        avatar,
      }
    );
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
};



export { ID, Query };

