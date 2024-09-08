import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentRides = [
  {
    ride_id: "1",
    origin_address: "Kathmandu, Nepal",
    destination_address: "Pokhara, Nepal",
    origin_latitude: 27.717245,
    origin_longitude: 85.323961,
    destination_latitude: 28.209583,
    destination_longitude: 83.985567,
    ride_time: 391,
    fare_price: 19500.0,
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-08-12 05:19:20.620007",
    driver: {
      first_name: "David",
      last_name: "Brown",
      car_seats: 5,
    },
  },
  {
    ride_id: "2",
    origin_address: "Jalkot, MH",
    destination_address: "Pune, Maharashtra, India",
    origin_latitude: 18.609116,
    origin_longitude: 77.165873,
    destination_latitude: 18.52043,
    destination_longitude: 73.856744,
    ride_time: 491,
    fare_price: 24500.0,
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 06:12:17.683046",
    driver: {
      first_name: "James",
      last_name: "Wilson",
      car_seats: 4,
    },
  },
  {
    ride_id: "3",
    origin_address: "Zagreb, Croatia",
    destination_address: "Rijeka, Croatia",
    origin_latitude: 45.815011,
    origin_longitude: 15.981919,
    destination_latitude: 45.327063,
    destination_longitude: 14.442176,
    ride_time: 124,
    fare_price: 6200.0,
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 08:49:01.809053",
    driver: {
      first_name: "James",
      last_name: "Wilson",
      car_seats: 4,
    },
  },
  {
    ride_id: "4",
    origin_address: "Okayama, Japan",
    destination_address: "Osaka, Japan",
    origin_latitude: 34.655531,
    origin_longitude: 133.919795,
    destination_latitude: 34.693725,
    destination_longitude: 135.502254,
    ride_time: 159,
    fare_price: 7900.0,
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-08-12 18:43:54.297838",
    driver: {
      first_name: "Michael",
      last_name: "Johnson",
      car_seats: 4,
    },
  },
];

export default function Home() {
  const { user } = useUser();
  const loading = false;
  const handleSignOut = () => {};
  const handleDestinationPress = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item) => item.ride_id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center p-4">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-60 h-60 mb-4"
                  resizeMode="contain"
                />
                <Text className="text-lg font-bold text-gray-500">
                  No recent rides found
                </Text>
              </>
            ) : (
              <Text className="text-lg font-bold text-gray-500">
                Loading...
              </Text>
            )}
          </View>
        )}
        ListHeaderComponent={
          <View className="px-5 py-4 bg-gray-100 border-b border-gray-200">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold">
                Welcome{","}
                {user?.firstName ||
                  user?.emailAddresses[0]?.emailAddress.split("@")[0]}
                👋
              </Text>
              <TouchableOpacity onPress={handleSignOut}>
                <Image source={icons.out} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300 mb-4"
              handlePress={handleDestinationPress}
            />

            <Text className="text-xl font-bold mt-4 mb-3">
              Your current location
            </Text>
            <View className="h-[300px] mb-5">
              <Map />
            </View>
            <Text className="text-xl font-bold mt-4 mb-2">Recent Rides</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
