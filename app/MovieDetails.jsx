import { View, Text, ScrollView, SafeAreaView, Dimensions, Image, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const { width: RESPONSIVE_WIDTH } = Dimensions.get('window');
const IMG_WIDTH = RESPONSIVE_WIDTH
const IMG_HEIGHT = IMG_WIDTH * (30 / 28)
const ICON_SIZE = RESPONSIVE_WIDTH * 0.07
const PLAY_BUTTON_SIZE = RESPONSIVE_WIDTH * 0.07
const PLAY_BUTTON_WIDTH = RESPONSIVE_WIDTH * 0.17

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [isTrue, setTrue] = useState(false)
  const [data, setData] = useState({});
  const options = {
    method: 'GET',
    url: 'https://netflix-api8.p.rapidapi.com/api/title/details',
    params: {
      titleId: `${id.toString()}`
    },
    headers: {
      'x-rapidapi-key': '1259d9bd78msh3e1a0182ddc5dcap1aefc1jsnc12957bba734',
      'x-rapidapi-host': 'netflix-api8.p.rapidapi.com'
    }
  };


  const getData = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.value.videos[id]);
      // console.log(response.data.value.videos[id]);
      // console.log('received');
      setTrue(true);


    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (!isTrue) {
    return <View></View>
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={{
        height: IMG_HEIGHT + (PLAY_BUTTON_WIDTH / 2)
      }} className="items-center relative">
        <View style={{
          zIndex: 100
        }} className="absolute pt-10 w-full justify-between flex-row items-center px-5">
          <Pressable>
            <Ionicons name='chevron-back' color={'#F00000'} size={ICON_SIZE} />
          </Pressable>
          <Pressable className="bg-[#ffffff2c] p-2 rounded-full">
            <Ionicons name='heart-outline' color={'#F00000'} size={ICON_SIZE} />
          </Pressable>
        </View>
        <View className="rounded-b-3xl items-center overflow-hidden " style={{
          width: RESPONSIVE_WIDTH * 1.9,
          height: IMG_HEIGHT,
          borderBottomLeftRadius: 400,
          borderBottomRightRadius: 400,
          elevation: 10
        }}>
          <Image style={{
            width: IMG_WIDTH,
            height: IMG_HEIGHT
          }} source={{ uri: data.details.verticalBackgroundArt[0] }} />
        </View>
        <LinearGradient style={{
          position: 'absolute',
          width: RESPONSIVE_WIDTH,
          height: IMG_HEIGHT
        }} colors={["#000", "transparent"]} />


        <Pressable style={{
          width: PLAY_BUTTON_WIDTH,
          aspectRatio: 1,
          elevation: 20
        }} className="absolute bottom-0 bg-white p-2.5 rounded-full justify-center items-center">
          <Ionicons name='play' size={PLAY_BUTTON_SIZE} color={'#F00000'} />
        </Pressable>

        <View className="flex-row w-full justify-between px-5">
          <View>
            <Ionicons name='bookmark-outline' size={ICON_SIZE} />
          </View>
          <View>
            <Ionicons name='share-social-outline' size={ICON_SIZE} />
          </View>
        </View>
      </SafeAreaView>



      <View className="items-center pt-2 space-y-3.5">
        <Text style={{
          fontSize: RESPONSIVE_WIDTH * 0.07
        }} className="font-bold">{data.details.title}</Text>
        <View className="flex-row gap-x-3 flex-wrap justify-center ">
          {
            data.details.genres.map((genre) => {
              return (
                <Text className="text-xs font-semibold text-black/[0.5]" key={genre.id}>{genre.name}</Text>
              )
            })
          }
        </View>
        <View className="flex-row gap-x-3">
          {
            [1, 2, 3, 4, 5].map((star) => {
              return (
                <Ionicons key={star} name='star' color={'#F00000'} size={RESPONSIVE_WIDTH * 0.05} />
              )
            })
          }
        </View>
        <View className="flex-row gap-x-10 justify-center w-full">
          <View className="items-center ">
            <Text className=" text-xs font-bold text-black/[0.5] ">Rated</Text>
            <Text style={{
              fontSize: RESPONSIVE_WIDTH * 0.05
            }} className="font-semibold">{data.details.maturityRating}</Text>
          </View>
          <View className="items-center">
            <Text className=" text-xs font-bold text-black/[0.5] ">Country</Text>
            <Text style={{
              fontSize: RESPONSIVE_WIDTH * 0.05
            }} className=" font-semibold ">USA</Text>
          </View>
          <View className="items-center">
            <Text className=" text-xs font-bold text-black/[0.5] ">Duration</Text>
            <Text style={{
              fontSize: RESPONSIVE_WIDTH * 0.05
            }} className="font-semibold ">{((data.details.runtime) / 60).toFixed(0)} min</Text>
          </View>
        </View>
        <View className="px-5">
          <Text className="text-center text-black/[0.5]">{data.details.synopsis}</Text>
        </View>
      </View>


      <View className="pt-5 space-y-2">
        <Text style={{
          fontSize: RESPONSIVE_WIDTH * 0.05
        }} className="ml-5 font-semibold">Casts</Text>
        <FlatList
          data={data.details.actors}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30
          }}
          renderItem={({ item, index }) => {
            return (
              <View style={{
                marginLeft: index === 0 ? 10 : 0,
                marginRight: 10,
                borderRadius: 10,
                overflow: 'hidden',
                elevation: 3
              }} key={item.id} className="relative border-[2px] border-[#FFF] bg-red-600">
                <Text className="py-2 px-3 font-semibold text-white" style={{
                  fontSize: RESPONSIVE_WIDTH * 0.03,

                }}>{item.name}</Text>
              </View>
            )
          }}
        />
      </View>


      <View className="pb-3 self-start px-5 space-y-5">
        <View className="flex-row items-center gap-x-5">
          <View style={{
            elevation: 3
          }} className="p-3 rounded-md bg-white">
            <Ionicons name='videocam' size={RESPONSIVE_WIDTH * 0.05} color={'#F00000'} />
          </View>
          <View>
            <Text className="text-black/[0.3] font-semibold text-xs">Directors</Text>
            <View>
              {
                data.details.directors.map((d) => {
                  return (
                    <Text style={{
                      fontSize: RESPONSIVE_WIDTH * 0.05,
                      fontWeight: 'bold'
                    }} key={d.id}>{d.name}</Text>
                  )
                })
              }
            </View>
          </View>
        </View>
        <View style={{
          elevation: 0
        }} className="  rounded-md  bg-white flex-row items-center gap-x-5">
          <View style={{
            elevation: 3
          }} className="p-3 rounded-md bg-white">
            <Ionicons name='clipboard' size={RESPONSIVE_WIDTH * 0.05} color={'#F00000'} />
          </View>
          <View>
            <Text className="text-black/[0.3] font-semibold text-xs">Writers</Text>
            <View>
              {
                data.details.writers.map((w) => {
                  return (
                    <Text style={{
                      fontSize: RESPONSIVE_WIDTH * 0.05,
                      fontWeight: 'bold'
                    }} key={w.id}>{w.name}</Text>
                  )
                })
              }
            </View>
          </View>
        </View>
      </View>


      <View className="py-5">
        <View className="flex-row justify-between px-5 py-2">
          <Text className="text-xl font-bold">Similar</Text>
          <Text>See all</Text>
        </View>
        <SimilarData id={id} />
      </View>



    </ScrollView>
  )
}

export default MovieDetails

const SimilarData = ({ id }) => {
  const [data, setData] = useState({});
  const [keys, setKeys] = useState([])
  // const keys = Object.keys(data);
  // console.log(keys);

  const options = {
    method: 'GET',
    url: 'https://netflix-api8.p.rapidapi.com/api/title/similars',
    params: {
      titleId: `${id.toString()}`
    },
    headers: {
      'x-rapidapi-key': '1259d9bd78msh3e1a0182ddc5dcap1aefc1jsnc12957bba734',
      'x-rapidapi-host': 'netflix-api8.p.rapidapi.com'
    }
  };
  const getData = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.value.videos);
      const keys = Object.keys(response.data.value.videos);
      setKeys(keys);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, [])

  if (keys.length === 0) {
    return <View></View>
  }

  return (
    <View>
      <FlatList
        horizontal
        data={keys.slice(0, 10)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }) =>
          <View style={{
            marginLeft: index === 0 ? 10 : 0,
            marginRight: 10
          }} className="relative rounded-xl overflow-hidden">
            <Image style={{
              width: RESPONSIVE_WIDTH * 0.45,
              aspectRatio: 35 / 50,
            }} source={{ uri: data[item.toString()].summary.verticalDisplayArt }} />
            <LinearGradient colors={["transparent", "#000"]} style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              padding: 10,
              justifyContent: 'flex-end'
            }} >
              <Text className="text-white">{data[item.toString()].summary.title}</Text>
              <View className="flex-row gap-x-0.5">
                {
                  [1, 2, 3, 4, 5].map((star) => {
                    return (
                      <Ionicons key={star} name='star' size={RESPONSIVE_WIDTH * 0.03} color={'#F00000'} />
                    )
                  })
                }
              </View>
            </LinearGradient>
          </View>
        }
      />
    </View>
  )
}