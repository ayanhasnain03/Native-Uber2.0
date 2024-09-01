import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <SignedIn>
        <View>
          <Text>{user?.fullName}</Text>
          <Text>{user?.emailAddresses[0].emailAddress}</Text>
        </View>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-up">Sign Up</Link>
      </SignedOut>
    </SafeAreaView>
  );
}
