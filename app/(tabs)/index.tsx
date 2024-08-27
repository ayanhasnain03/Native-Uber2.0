import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View>
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
