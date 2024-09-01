import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Alert,
  ScrollView,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import AuthController from '../../controllers/AuthController';
import {createUser} from '../../models/UserModel';
import Custom_Button from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../../utils/Color';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {height, width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();

  const handleSignUp = async () => {
    setLoading(true);
    if (signUpData.password !== signUpData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const user = await AuthController.signUp(
        signUpData.email,
        signUpData.password,
      );

      if (user) {
        createUser(user.user.uid, signUpData.name, signUpData.email);
      }

      ToastAndroid.show('Sign up successful', ToastAndroid.SHORT);
      navigation.replace('Home');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.imageView, {height: height * 0.25}]}></View>

        <View
          style={{
            height: height * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.signUpTitle, {fontSize: height * 0.027}]}>
            Create an Account
          </Text>

          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={'grey'}
            value={signUpData.name}
            onChangeText={text => setSignUpData({...signUpData, name: text})}
            style={[styles.inputField, {height: height * 0.06}]}
          />

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={'grey'}
            keyboardType="email-address"
            value={signUpData.email}
            onChangeText={text => setSignUpData({...signUpData, email: text})}
            style={[styles.inputField, {height: height * 0.06}]}
          />

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={'grey'}
            secureTextEntry={true}
            value={signUpData.password}
            onChangeText={text =>
              setSignUpData({...signUpData, password: text})
            }
            style={[styles.inputField, {height: height * 0.06}]}
          />

          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor={'grey'}
            secureTextEntry={true}
            value={signUpData.confirmPassword}
            onChangeText={text =>
              setSignUpData({...signUpData, confirmPassword: text})
            }
            style={[styles.inputField, {height: height * 0.06}]}
          />

          <Custom_Button
            onPress={handleSignUp}
            text="Sign Up"
            textColor={'#fff'}
            width={width * 0.9}
            marginTop={height * 0.02}
            loading={loading}
          />
        </View>

        <View style={{height: height * 0.15}}>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[styles.signInText, {fontSize: height * 0.023}]}>
              Already Register? Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    height: '100%',
    width: '50%',
    resizeMode: 'cover',
  },

  inputField: {
    width: '100%',
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 25,
    elevation: 5,
    color: Colors.primaryColor,
  },

  signUpTitle: {
    color: Colors.primaryColor,
    alignSelf: 'center',
  },
  signInText: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});
