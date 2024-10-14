import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NetflixIcon from '../../assets/icons/NetflixIcon';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import Animated, { FadeIn, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, ZoomIn, ZoomInEasyDown } from 'react-native-reanimated';

import TrendingMovies from '../../components/Home/TrendingMovies';
import NonEnglishFilms from '../../components/Home/NonEnglishFilms';
import TvShows from '../../components/Home/TvShows';
import NonEnglishShows from '../../components/Home/NonEnglishShows';

import SplashScreen from '../../components/screens/SplashScreen';

const { width: RESPONSIVE_WIDTH } = Dimensions.get('window');

const TAB_WIDTH = RESPONSIVE_WIDTH * 0.9;
const ICON_SIZE = RESPONSIVE_WIDTH * 0.07

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Home = () => {
  const [data, setData] = useState({})
  const [isTrue, setTrue] = useState(false);
  const options = {
    method: 'GET',
    url: 'https://netflix-api8.p.rapidapi.com/api/title/top-10',
    headers: {
      'x-rapidapi-key': '1259d9bd78msh3e1a0182ddc5dcap1aefc1jsnc12957bba734',
      'x-rapidapi-host': 'netflix-api8.p.rapidapi.com'
    }
  };

  const getData = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.pageProps.data.mostPopular);
      setTrue(true);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])




  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  })


// setTimeout(() => {
//   setTrue(true)
// }, 2000)



  if (!isTrue) {
    return <View className="flex-1">
      <SplashScreen />
    </View>
  }
  return (
    <Animated.View entering={FadeIn.duration(1000)} className="flex-1  bg-white">
      <StatusBar style='light' />
      <Header scrollY={scrollY} />
      <Animated.ScrollView contentContainerStyle={{
        paddingBottom: 100,
      }}
        onScroll={handleScroll}
      >
        <TrendingMovies data={data.films} />
        <NonEnglishFilms data={data["films-non-english"]} />
        <TvShows data={data.tv} />
        <NonEnglishShows data={data["tv-non-english"]} />
      </Animated.ScrollView>
    </Animated.View>
  )
}

export default Home

const styles = StyleSheet.create({})


const Header = ({ scrollY }) => {
  const bgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(255, 255, 255, ${scrollY.value / 200} ) `
    }
  })
  return (
    <AnimatedSafeAreaView style={[{
      width: RESPONSIVE_WIDTH,
      zIndex: 100
    }, bgStyle]} className="px-3 pb-3 flex-row justify-between items-center absolute">
      <View className="  p-2  rounded-md" style={{
        // elevation: 4
      }}>
        <Ionicons name='menu-outline' size={ICON_SIZE} color={'#F00000'} />
      </View>
      <View>
        <NetflixIcon />
      </View>
      <View className="  p-2 rounded-md" style={{
        // elevation: 4
      }}>
        <Ionicons name='notifications-outline' size={ICON_SIZE} color={'#F00000'} />
      </View>

    </AnimatedSafeAreaView>
  )
}
