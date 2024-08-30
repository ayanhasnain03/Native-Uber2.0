import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
        router.replace("/");
      } else {
        setVerification({
          ...verification,
          state: "error",
          error: "Verification code is invalid.",
        });
      }
    } catch (err: any) {
      setVerification({ ...verification, state: "error", error: err.message });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="relative items-center justify-center mb-5">
        <Image
          source={images.signUpCar}
          className="w-full h-[300px]"
          resizeMode="contain"
        />
        <Text className="absolute bottom-5 left-5 text-black text-2xl font-bold">
          Create Your Account
        </Text>
      </View>

      <View className="flex-1">
        <InputField
          label="Name"
          placeholder="Enter name"
          icon={icons.person}
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />

        <InputField
          label="Email"
          placeholder="Enter email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />

        <InputField
          label="Password"
          placeholder="Enter password"
          icon={icons.lock}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />

        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          className="mt-6 bg-blue-500 text-white"
        />

        <Link
          href="/sign-in"
          className="text-center mt-6 text-lg text-gray-500"
        >
          <Text>Already have an account? </Text>
          <Text className="text-blue-500">Log In</Text>
        </Link>

        <OAuth />
      </View>

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onBackdropPress={() =>
          setVerification({ ...verification, state: "default" })
        }
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
        className="flex justify-center items-center"
      >
        <View className="bg-white px-7 py-9 rounded-2xl w-[80%]">
          <Text className="text-2xl font-bold mb-2">Verification</Text>
          <Text className="mb-5 text-center">
            We've sent a verification code to {form.email}.
          </Text>
          <InputField
            label={"Code"}
            icon={icons.lock}
            placeholder={"12345"}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => setVerification({ ...verification, code })}
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-5 bg-green-500 text-white"
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        isVisible={showSuccessModal}
        className="flex justify-center items-center"
      >
        <View className="bg-white px-7 py-9 rounded-2xl w-[80%]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-bold text-center">Verified</Text>
          <Text className="text-base text-gray-400 text-center mt-2">
            You have successfully verified your account.
          </Text>
          <CustomButton
            title="Browse Home"
            onPress={() => router.push(`/(root)/(tabs)/home`)}
            className="mt-5 bg-blue-500 text-white"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;
