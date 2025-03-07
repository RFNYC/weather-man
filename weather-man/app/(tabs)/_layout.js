import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
       tabBarActiveTintColor: 'blue',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          tabBarStyle: ({display: 'none'}),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="userHomePage"
        options={{
          href:null
        }}
      />
    </Tabs>
  );
}
