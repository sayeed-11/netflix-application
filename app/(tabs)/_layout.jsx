import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  const { width: RESPONSIVE_WIDTH } = Dimensions.get('window');

  const TAB_WIDTH = RESPONSIVE_WIDTH * 0.9;

  const ICON_SIZE = RESPONSIVE_WIDTH * 0.05;
  const ICON_SIZE_FOCUSED = RESPONSIVE_WIDTH * 0.07;


  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          width: TAB_WIDTH,
          marginLeft: (RESPONSIVE_WIDTH - TAB_WIDTH) / 2,
          borderTopWidth: 1,
          // borderBottomWidth: 2,
          // borderRightWidth: 2,
          // borderLeftWidth: 2,
          borderColor: '#F2F2F2',
          height: RESPONSIVE_WIDTH * 0.15,
          borderRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 2,
          shadowColor: '#000',  // iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
      }}>


        {/* INDEX */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View className={`flex-1 justify-center items-center space-y-1.5 relative`}>
                {
                  focused ? <View className='absolute w-[50%] h-1 bg-red-500 top-0 rounded-b-xl'></View> : null
                }
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? "#F00000" : "#000000"} size={ICON_SIZE} />
                {
                  focused ? <Text style={{
                    fontSize: RESPONSIVE_WIDTH * 0.025,
                    fontWeight: 'bold'
                  }} className={`text-[#F00000]`}>Home</Text> : null
                }
              </View>
            )
          }
        }}
      />


<Tabs.Screen
        name="Seasons"
        options={{
          title: 'Seasons',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View className={` flex-1 justify-center items-center space-y-1.5 relative`}>
                {
                  focused ? <View className='absolute w-[50%] h-1 bg-red-500 top-0 rounded-b-xl'></View> : null
                }
                <TabBarIcon name={focused ? 'albums' : 'albums-outline'} color={focused ? "#F00000" : "#000000"} size={ICON_SIZE} />
                {
                  focused ? <Text style={{
                    fontSize: RESPONSIVE_WIDTH * 0.025,
                    fontWeight: 'bold'
                  }} className={`text-[#F00000]`}>Seasons</Text> : null
                }
              </View>
            )
          }
        }}
      />


      {/* Search */}
      <Tabs.Screen
        name="Search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={{
              width: RESPONSIVE_WIDTH * 0.15,
              elevation: 2
            }} className="-translate-y-3 bg-[#F00000] justify-center items-center aspect-square rounded-full border-2 border-[#F2F2F2]">
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={'#FFFFFF'} size={size} />
            </View>
          ),
        }}
      />


      {/* Hot */}
      <Tabs.Screen
        name="Hot"
        options={{
          title: 'Hot',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View className={` flex-1 justify-center items-center space-y-1.5 relative`}>
                {
                  focused ? <View className='absolute w-[50%] h-1 bg-red-500 top-0 rounded-b-xl'></View> : null
                }
                <TabBarIcon name={focused ? 'flame' : 'flame-outline'} color={focused ? "#F00000" : "#000000"} size={ICON_SIZE} />
                {
                  focused ? <Text style={{
                    fontSize: RESPONSIVE_WIDTH * 0.025,
                    fontWeight: 'bold'
                  }} className={`text-[#F00000]`}>Hot</Text> : null
                }
              </View>
            )
          }
        }}
      />


      {/* Account */}
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View className={` flex-1 justify-center items-center space-y-1.5 relative`}>
                {
                  focused ? <View className='absolute w-[50%] h-1 bg-red-500 top-0 rounded-b-xl'></View> : null
                }
                <TabBarIcon name={focused ? 'person' : 'person-outline'} color={focused ? "#F00000" : "#000000"} size={ICON_SIZE} />
                {
                  focused ? <Text style={{
                    fontSize: RESPONSIVE_WIDTH * 0.025,
                    fontWeight: 'bold'
                  }} className={`text-[#F00000]`}>Account</Text> : null
                }
              </View>
            )
          }
        }}
      />

    </Tabs>
  );
}
