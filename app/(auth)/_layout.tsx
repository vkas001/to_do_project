import { Slot } from "expo-router";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function _Layout() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 40 }}
>

       <View
         className="w-full relative"
         style={{
         backgroundColor: 'black',
         height: Dimensions.get('screen').height / 2.25,
            
      }}>

        <ImageBackground source={
          require('../../assets/images/android-icon-foreground.png')} 
          className="size-full rounded-b-lg" resizeMode="stretch"
        />
        <Image source={
          require('../../assets/images/react-logo.png')}
          style={{ width: 110, height: 110, backgroundColor: 'black', borderRadius: 30 }}
          className="self-center size-48 absolute -bottom-10 z-10"
        />

        </View>

        <Slot />

      </ScrollView>

    </KeyboardAvoidingView>
  );
}
