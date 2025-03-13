import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (

    // <Tabs.../> is built around "Bottom Tab Navigator" anything you see in those docs can be applied here.
    <Tabs screenOptions={{
       tabBarActiveTintColor: 'blue',
       animation:"shift"
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          tabBarStyle: ({display: 'none'}),
          headerShown: false,
          href:null
        }}
      />
      <Tabs.Screen
        name="index2"
        options={{
          title: 'index2',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          tabBarStyle: ({display: 'none'}),
          headerShown: false,
          href:null
        }}
      />
      <Tabs.Screen
        name="userHomePage"
      />
    </Tabs>
  );
}
