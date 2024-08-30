import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants";
import CustomButton from "@/components/CustomButton";

const { width } = Dimensions.get("window");

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex justify-end items-end p-5">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(auth)/sign-up");
          }}
        >
          <Text className="text-black text-md font-JakartaBold">Skip</Text>
        </TouchableOpacity>
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className="flex-1 items-center justify-center px-5"
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="w-full mt-10">
              <Text className="text-black text-3xl font-bold text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <View className="w-full items-center justify-center mb-10">
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
          className="w-11/12 mt-10"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
