import { Tabs } from "expo-router"
import { Ionicons, Foundation } from "@expo/vector-icons"

export default function Layout() {
  return (
    //Barra de navegação inferior
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#d32f2f",
        headerStyle: { backgroundColor: "#fff" },
        headerShadowVisible: false,
        headerTintColor: "#000",
        tabBarStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home_page"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="feed_page"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbox" : "chatbox-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="post_page"
        options={{
          title: "Postar",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "camera" : "camera-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ranking_page"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile_page"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
