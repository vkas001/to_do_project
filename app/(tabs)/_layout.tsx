import useAuthStore from '@/store/auth.store';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { View } from 'react-native';

const TabBarIcon = ({
  icon: Icon,
  focused,
  iconName,
}: {
  icon: any;
  focused: boolean;
  iconName: string;
}) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      width: 62,
      height: 50,
      borderRadius: 14,
      backgroundColor: focused ? "rgba(0,110,160,0.2)" : "transparent",
      borderWidth: focused ? 1 : 0,
      borderColor: focused ? "rgb(0,110,160)" : "transparent",
    }}
  >
    <Icon
      name={iconName}
      size={26}
      color={focused ? "rgb(0,160,255)" : "gray"}
    />
  </View>
);

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 40,
          backgroundColor: "rgba(0,25,40,0.9)",
          
          // Soft shadow for floating feel
          shadowColor: "#0090ff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 10,
          borderWidth: 1,
          borderColor: "rgba(0,150,200,0.15)",
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={Ionicons}
              iconName={focused ? "home" : "home-outline"}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={Ionicons}
              iconName={focused ? "person" : "person-outline"}
              focused={focused}
            />
          ),
        }}
      />

    </Tabs>
  );
}
