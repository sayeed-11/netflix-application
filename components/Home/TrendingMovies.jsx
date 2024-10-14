import { View, Text, FlatList, Image, Dimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SharedTransition } from 'react-native-reanimated';
import { isSharedValue } from 'react-native-reanimated';
import { router } from 'expo-router';

const { width: RESPONSIVE_WIDTH } = Dimensions.get('window');
const IMG_WIDTH = RESPONSIVE_WIDTH * 0.65
const IMG_HEIGHT = IMG_WIDTH * (570 / 407)
const MOVIE_CARD_TRANSLATE = RESPONSIVE_WIDTH * 0.1
const CARD_CONTAINER_HEIGHT = IMG_HEIGHT + (MOVIE_CARD_TRANSLATE * 4.5)
const PADDING_BOTTOM = RESPONSIVE_WIDTH * 0.5

const TrendingMovies = ({ data }) => {
  // const [data, setData] = useState([])
  // const options = {
  //   method: 'GET',
  //   url: 'https://netflix-api8.p.rapidapi.com/api/title/details',
  //   params: {
  //     titleId: '80057465'
  //   },
  //   headers: {
  //     'x-rapidapi-key': '1259d9bd78msh3e1a0182ddc5dcap1aefc1jsnc12957bba734',
  //     'x-rapidapi-host': 'netflix-api8.p.rapidapi.com'
  //   }
  // };

  // const getData = async () => {
  //   try {
  //     const response = await axios.request(options);
  //     setData(response.data.paths);
  //     console.log(response.data.value.videos);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [])
  const scrollX = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
    // console.log(scrollX.value);

  })
  return (
    <View className=" relative " style={{ paddingBottom: PADDING_BOTTOM }}>
      <View className="" style={{ height: CARD_CONTAINER_HEIGHT }}>
        <FlatList
          data={data}
          scrollEnabled={false}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16} // Improves performance
          removeClippedSubviews={false}
          snapToInterval={RESPONSIVE_WIDTH}
          renderItem={({ item, index }) => {
            return (
              <MoviePoster item={item} scrollX={scrollX} index={index} />
            )
          }}
        />
      </View>

      <LinearGradient style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        // paddingBottom : PADDING_BOTTOM
      }} colors={["#000", 'transparent', "#FFF"]} />

      <View className="justify-start absolute -bottom-5" style={{
        height: CARD_CONTAINER_HEIGHT,
        // transform:[{translateY:100}]
      }}>
        <Animated.FlatList
          contentContainerStyle={{
            transform: [{ translateY: -(MOVIE_CARD_TRANSLATE / 2) }],
            paddingBottom: MOVIE_CARD_TRANSLATE / 2
          }}
          onScroll={handleScroll}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          data={data}
          snapToInterval={RESPONSIVE_WIDTH}
          scrollEventThrottle={16}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => {
            return (
              <MovieCard item={item} scrollX={scrollX} index={index} />
            )
          }}
        />
      </View>
    </View>
  )
}

export default TrendingMovies

const MovieCard = ({ item, scrollX, index }) => {
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * RESPONSIVE_WIDTH, index * RESPONSIVE_WIDTH, (index + 1) * RESPONSIVE_WIDTH],
            [-RESPONSIVE_WIDTH * 0.33, 0, RESPONSIVE_WIDTH * 0.33],
            Extrapolation.CLAMP
          )
        },
        {
          translateY: interpolate(
            scrollX.value,
            [(index - 1) * RESPONSIVE_WIDTH, index * RESPONSIVE_WIDTH, (index + 1) * RESPONSIVE_WIDTH],
            [MOVIE_CARD_TRANSLATE, 0, MOVIE_CARD_TRANSLATE],
            Extrapolation.CLAMP
          )
        }
      ],
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * RESPONSIVE_WIDTH, index * RESPONSIVE_WIDTH, (index + 1) * RESPONSIVE_WIDTH],
        [0.8, 1, 0.8]
      )
    }
  })
  return (
    <Animated.View className="items-center justify-center " style={[{
      width: RESPONSIVE_WIDTH,
    }, cardStyle]}>
      <Pressable onPress={() => {
        router.push({
          pathname:'MovieDetails',
          params : {id : item.id}
        })
      }}>
        <View className="p-3 bg-white rounded-3xl" style={{
          width: IMG_WIDTH,
        }}>
          <Image className="rounded-2xl" style={{
            width: '100%',
            height: IMG_HEIGHT
          }} source={{ uri: item.boxart.vertical }} />
          <View className="p-1 space-y-2">
            <Text style={{ fontSize: RESPONSIVE_WIDTH * 0.04 }} className='text-center font-semibold' numberOfLines={1}>{item.showName}</Text>
            <View className="flex-row self-center">
              {
                [1, 2, 3, 4, 5].map((item) => {
                  return (
                    <View key={item}>
                      <Ionicons name='star' color={'#F00000'} />
                    </View>
                  )
                })
              }
            </View>
            <View className="flex-row justify-center gap-x-5 items-center">
              <Text className="text-center font-bold">Rank : {item.rank}</Text>
              <Text style={{
                fontSize: RESPONSIVE_WIDTH * 0.025,
                borderRadius: 5
              }} className="bg-yellow-500 px-2 py-0.5 text-white">Film</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}


const MoviePoster = ({ item, scrollX, index }) => {
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -scrollX.value
        },
      ]
    }
  })

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * RESPONSIVE_WIDTH, index * RESPONSIVE_WIDTH, (index + 1) * RESPONSIVE_WIDTH],
            [-RESPONSIVE_WIDTH, 0, RESPONSIVE_WIDTH],
            Extrapolation.CLAMP
          )
        },

      ],
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * RESPONSIVE_WIDTH, index * RESPONSIVE_WIDTH, (index + 1) * RESPONSIVE_WIDTH],
        [0, 1, 0],
        Extrapolation.CLAMP
      )
    };
  });
  return (
    <Animated.View className="" style={[{
      width: RESPONSIVE_WIDTH,
      height: RESPONSIVE_WIDTH * (570 / 407)
    }, cardStyle]}>
      <Animated.Image style={[{
        width: '100%',
        height: RESPONSIVE_WIDTH * (570 / 407)
      }, imageStyle]} source={{ uri: item.boxart.vertical }} />
    </Animated.View>
  )
}