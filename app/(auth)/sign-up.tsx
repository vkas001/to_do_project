import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/_appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setform] = useState({
    name: '',
    email: '',
    password: ''});

    const submit = async () => {

      const { name, email, password } = form;

      if(!name || !email || !password) {
        Alert.alert("Error", "Please enter valid email and password");
        return;
      }
      setIsSubmitting(true);

      try {

        await createUser({
          email, 
           password, 
           name
        });

        router.replace('/');

      } catch (error: any) {
        Alert.alert('Error', error.message);

      } finally {
        setIsSubmitting(false);
      }
    };

   return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

      <CustomInput 
          placeholder="Enter your name"
          value={form.name}
          onChangeText={(text) => setform((prev) => ({...prev, name: text}))}
          label="Name"
        />

      <CustomInput 
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => setform((prev) => ({...prev, email: text}))}
          label="Email"
          keyboardType="email-address"
        />

        <CustomInput 
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(text) => setform((prev) => ({...prev, password: text}))}
          label="Password"
          secureTextEntry={true}
        />

        <CustomButton
           title="Sign Up"
          style="bg-black py-4 rounded-xl w-11/12 self-center mt-8 shadow-lg"
          textStyle="text-center text-white text-lg font-semibold"
          isLoading={isSubmitting}
          onPress={submit}
        />
      
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-grey-100'>
          Already have an account?

        </Text>

        <Link href="/sign-in" className='base-bold text-purple'>
          Sign In
        </Link>
      </View>
      
    </View>
  );
};

export default SignUp;