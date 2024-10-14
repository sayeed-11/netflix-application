import { View, Text, Dimensions } from 'react-native'
import React from 'react'
// import NetflixIcon from '../../assets/icons/NetflixIcon'
import NetflixIcon from '../../assets/icons/AnimatedLogo'
import { Tabs } from 'expo-router'

const { width } = Dimensions.get('window')

const SplashScreen = () => {
    return (
        <View className='flex-1 bg-[#323539] justify-center items-center'>
            {/* <Tabs.Screen options={{
                tabBarStyle: {
                    opacity: 0,
                    position: 'absolute'
                }
            }} /> */}
            <NetflixIcon size={width * 0.5} />
        </View>
    )
}

export default SplashScreen