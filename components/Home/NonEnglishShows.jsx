import { View, Text, Image, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width: RESPONSIVE_WIDTH } = Dimensions.get('window');
const IMG_WIDTH = RESPONSIVE_WIDTH * 0.4
const IMG_HEIGHT = IMG_WIDTH * (570 / 407)

const NonEnglishShows = ({ data }) => {

    return (
        <View className="space-y-3">
            <View className="flex-row justify-between px-4 items-center">
                <Text className="text-[#F00000] font-semibold">TV Shows</Text>
                <View className="flex-row items-center space-x-2">
                <Text className="text-xs text-[#F00000]">See all</Text>
                <Ionicons name='arrow-forward' color={"#F00000"}/>
                </View>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <MovieCard item={item} index={index} />
                    )
                }}
            />
        </View>
    )
}

export default NonEnglishShows


const MovieCard = ({ item, index }) => {
    return (
        <View style={{
            marginLeft: index === 0 ? 10 : 0,
            marginRight: 10
        }} className="rounded-md overflow-hidden relative">
            <Image style={{
                width: IMG_WIDTH,
                height: IMG_HEIGHT
            }} source={{ uri: item.boxart.vertical }} />
            <LinearGradient style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                padding: 10
            }} colors={["transparent", "#000"]}>
                <View className="space-y-2">
                    <Text numberOfLines={1} className="text-white">{item.showName}</Text>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row">
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
                        <Text className="text-white text-xs">Rank : {item.rank}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}